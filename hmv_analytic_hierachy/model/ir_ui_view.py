
from odoo import fields, models, _

class ViewReport(models.Model):
    _inherit = 'ir.ui.view'

    type = fields.Selection(selection_add=[('hierachy_analytic', "Hierachy Analytic")], ondelete={'hierachy_analytic': 'cascade'})


class ActWindowViewReport(models.Model):
    _inherit = 'ir.actions.act_window.view'

    view_mode = fields.Selection(selection_add=[('hierachy_analytic', "Hierachy Analytic")], ondelete={'hierachy_analytic': 'cascade'})
