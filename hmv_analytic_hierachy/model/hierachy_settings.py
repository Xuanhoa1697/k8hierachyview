# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models, _
from odoo.exceptions import UserError, ValidationError


class HierachySettings(models.Model):
    _name = 'hierachy.settings'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _order = 'id desc'

    model_id = fields.Many2one('ir.model', string='Model')
    action_ids = fields.Many2many('ir.actions.act_window', 'hierachy_settings_action_rel' , string='Action', ondelete='cascade')
    model = fields.Char(string='Model Name', store=True)
    domain = fields.Char(string='Domain')
    field_mapping = fields.Many2one('ir.model.fields', string='Field Mapping')
    view_id = fields.Many2one('ir.ui.view', string='View')

    color_header = fields.Char(string='Header')
    color_footer = fields.Char(string='Footer')
    color_background = fields.Char(string='Background')
    color_text = fields.Char(string='Color')
    color_border = fields.Char(string='Border')
    is_add_to_view = fields.Boolean(string="Add to View", compute="_compute_is_add_to_view")

    details_ids = fields.One2many('hierachy.settings.details', 'hierachy_settings_id', string="Details")

    _sql_constraints = [
        ('unique_action', 'UNIQUE(model_id)', 'Model must be unique!'),
    ]
                

    @api.onchange('model_id')
    def onchange_mode_id(self):
        if self.model_id:
            self.model = self.model_id.model

    def action_active_hierachy(self):
        self.ensure_one()
        if not self.view_id and self.action_ids:
            name = self.model.replace('.', '_')
            view_id = self.view_id.sudo().create({
                'name': name + f'_hierachy_{self.id}',
                'model': self.model,
                'priority': 99999,
                'type': 'hierachy_analytic',
                'arch': """<hierachy_analytic string="Hierachy"/>""",
            })
            self.view_id = view_id.id
            
            for action in self.action_ids:
                if action.view_mode and 'hierachy_analytic' not in action.view_mode:
                    action.view_mode += ',hierachy_analytic'


    @api.model
    def get_data_hierachy_analytic(self, domain=[], model=False):
        data = []
        result = {}
        if not model:
            return result
        setting_id = self.sudo().search([('model', '=', model)])
        if not setting_id:
            return result
        result.update({
            'color_header': setting_id.color_header,
            'color_footer': setting_id.color_footer,
            'color_background': setting_id.color_background,
            'color_text': setting_id.color_text,
            'color_border': setting_id.color_border
        })
        if setting_id.domain:
            domain += eval(setting_id.domain)
        active_ids = self.env[model].search(domain)
        child_ids = self.env[model].search([('id', 'child_of', active_ids.ids)])
        parent_ids = self.env[model].search([('id', 'parent_of', active_ids.ids)])
        active_ids |= child_ids
        active_ids |= parent_ids
        for record in active_ids:
            value = {
                'id': record.id,
            }
            for item in setting_id.sudo().details_ids:
                value_field = getattr(record, item.field_id.name)
                if (item.sudo().field_id.ttype == 'many2one'):
                    value_field = getattr(value_field, 'name') if hasattr(value_field, 'name') else getattr(value_field, 'display_name')
                if (item.sudo().field_id.ttype == 'many2many'):
                    value_field = value_field.mapped('name') if hasattr(value_field, 'name') else value_field.mapped('display_name')
                    value_field = ', '.join(value_field)
                if (item.sudo().field_id.sudo().ttype == 'selection'):
                    value_field = list(filter(lambda x: x[0] == value_field, record._fields[item.sudo().field_id.name].selection))[0][1]
                value.update({
                    item.ttype: value_field
                })
            if record.parent_id:
                value.update({
                    'manager': getattr(record, setting_id.sudo().field_mapping.name).id
                })
            data.append(value)
        result.update({
            'data': data
        })
        return result

    
    def action_inactive_hierachy(self):
        self.ensure_one()
        if self.action_ids:
            for action in self.action_ids:
                if action.view_mode and 'hierachy_analytic' in action.view_mode:
                    mode_view_split = action.view_mode.split(',')
                    active_view = filter(lambda x: 'hierachy_analytic' not in x, mode_view_split)
                    action.view_mode = ','.join(list(active_view))
        self.view_id.sudo().unlink()

class HierachySettings(models.Model):
    _name = 'hierachy.settings.details'

    sequence = fields.Integer(string="Sequence")
    ttype = fields.Selection([('header', 'Header'), ('body', 'Body'), ('footer', 'Footer')], string="Type")
    field_id = fields.Many2one('ir.model.fields', string="Field")
    hierachy_settings_id = fields.Many2one('hierachy.settings', string="Hierachy Settings")