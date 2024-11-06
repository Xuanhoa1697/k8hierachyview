/* @odoo-module */

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { onMounted } from "@odoo/owl";
import { renderToElement } from "@web/core/utils/render";
import { standardWidgetProps } from "@web/views/widgets/standard_widget_props";
import { Record } from "@web/model/relational_model/record";
import { patch } from "@web/core/utils/patch";

patch(Record.prototype, {
    async update(changes, { save } = {}) {
        await super.update(changes, { save } = {});
        if ($('#analytic_hierachy_form_view').length > 0) {
            var setting = this.data;
            if (this._parentRecord) {
                setting = this._parentRecord.data;
            }
            this.renderWidget(setting);
        }
    },
    renderWidget(setting) {
        var self = this;
        $('#analytic_hierachy_form_view').empty();
        var data = [{
            'id': 1,
            'header': 'Header 1',
            'footer': 'Footer 1',
            'body': 'Body 1',
        },
        {
            'id': 2,
            'header': 'Header 2',
            'footer': 'Footer 2',
            'body': 'Body 2',
            'manager': 1
        },
        {
            'id': 3,
            'header': 'Header 3',
            'footer': 'Footer 3',
            'body': 'Body 3',
            'manager': 1
        }]
        ej.diagrams.Diagram.Inject(ej.diagrams.DataBinding, ej.diagrams.HierarchicalTree);
        var DiagramConstraints = ej.diagrams.DiagramConstraints;

        var items = new ej.data.DataManager(data);
        var diagram = new ej.diagrams.Diagram({
            mode: 'SVG',
            snapSettings: {
            constraints: ej.diagrams.SnapConstraints.None
            },
            constraints: DiagramConstraints.Default & ~DiagramConstraints.PageEditable,
            dataSourceSettings: {
            id: 'id', parentId: 'manager', dataManager: items
            },
            layout: {
            type: 'OrganizationalChart',
            horizontalSpacing: 30,
            verticalSpacing: 100,
            orientation: 'TopToBottom',
            getLayoutInfo: function (node, tree) {
                if (!tree.hasSubTree) {
                tree.orientation = 'Horizontal';
                tree.type = 'Alternate';
                }
            }
            },
            getNodeDefaults: function (obj, diagram) {
            var border = '#ced4da'
            var is_parent = false;
            obj.annotations = [{
                id: "label1",
                style: {
                fontSize: 12,
                fontFamily: '"Odoo Unicode Support Noto", "Lucida Grande", Helvetica, Verdana, Arial, sans-serif;',
                color: "black"
                }
            }];
            if (obj.properties.data && !obj.properties.data.hasOwnProperty('manager')) {
                // obj.annotations[0].style.bold = true
                // obj.annotations[0].style.color = "#d8dadd"
                // border = '#d8dadd';
                is_parent = true
            }
            obj.style = { fill: 'None', strokeColor: 'black', strokeWidth: 1 };
            obj.shape = {
                type: 'HTML',
                content: renderToElement('hmv_analytic_hierachy.HierachyRendererViewTemplates', {
                    id: obj.properties.data.id,
                    header_content: obj.properties.data.header,
                    border: border,
                    footer_content: obj.properties.data.footer,
                    is_parent: is_parent,
                    body: obj.properties.data.body,
                    header: setting.color_header || '#714B67',
                    footer: setting.color_footer || '#714B67',
                    background: setting.color_background || 'white',
                    color: setting.color_text || 'white',
                    border: setting.color_border || '#ced4da',
                })
            }
            obj.borderColor = '#ced4da';
            obj.width = 200;
            obj.height = 90;
            (obj.shape).margin = { left: 10, right: 10, top: 5, bottom: 5 };
            return obj;
            },
            getConnectorDefaults: function (connector, diagram) {
            connector.style = {
                strokeColor: '#714B67',
                strokeWidth: 2
            };
            connector.targetDecorator.style.fill  =  '#714B67';
            connector.targetDecorator.style.strokeColor  =  '#714B67';
            connector.type = 'Orthogonal';
            return connector;
            },
            setNodeTemplate: function (node) {
            node.annotations[0].content = node.data.name;
            node.style.fill = 'white';
            node.style.strokeColor = '#ced4da';
            node.style.strokeWidth = 1
            }

        });
        diagram.appendTo('#analytic_hierachy_form_view');
    }
});

export class HierachyK8s extends Component {
    setup() {
        super.setup();
        onMounted(() => {
            var setting = this.props.record.data;
            this.renderWidget(setting)
        });
    }


    renderWidget(setting) {
        var self = this;
        var data = [{
            'id': 1,
            'header': 'Header 1',
            'footer': 'Footer 1',
            'body': 'Body 1',
        },
        {
            'id': 2,
            'header': 'Header 2',
            'footer': 'Footer 2',
            'body': 'Body 2',
            'manager': 1
        },
        {
            'id': 3,
            'header': 'Header 3',
            'footer': 'Footer 3',
            'body': 'Body 3',
            'manager': 1
        }]
        ej.diagrams.Diagram.Inject(ej.diagrams.DataBinding, ej.diagrams.HierarchicalTree);
        var DiagramConstraints = ej.diagrams.DiagramConstraints;

        var items = new ej.data.DataManager(data);
        var diagram = new ej.diagrams.Diagram({
            mode: 'SVG',
            snapSettings: {
            constraints: ej.diagrams.SnapConstraints.None
            },
            constraints: DiagramConstraints.Default & ~DiagramConstraints.PageEditable,
            dataSourceSettings: {
            id: 'id', parentId: 'manager', dataManager: items
            },
            layout: {
            type: 'OrganizationalChart',
            horizontalSpacing: 30,
            verticalSpacing: 100,
            orientation: 'TopToBottom',
            getLayoutInfo: function (node, tree) {
                if (!tree.hasSubTree) {
                tree.orientation = 'Horizontal';
                tree.type = 'Alternate';
                }
            }
            },
            getNodeDefaults: function (obj, diagram) {
            var border = '#ced4da'
            var is_parent = false;
            obj.annotations = [{
                id: "label1",
                style: {
                fontSize: 12,
                fontFamily: '"Odoo Unicode Support Noto", "Lucida Grande", Helvetica, Verdana, Arial, sans-serif;',
                color: "black"
                }
            }];
            if (obj.properties.data && !obj.properties.data.hasOwnProperty('manager')) {
                // obj.annotations[0].style.bold = true
                // obj.annotations[0].style.color = "#d8dadd"
                // border = '#d8dadd';
                is_parent = true
            }
            obj.style = { fill: 'None', strokeColor: 'black', strokeWidth: 1 };
            obj.shape = {
                type: 'HTML',
                content: renderToElement('hmv_analytic_hierachy.HierachyRendererViewTemplates', {
                    id: obj.properties.data.id,
                    header_content: obj.properties.data.header,
                    border: border,
                    footer_content: obj.properties.data.footer,
                    is_parent: is_parent,
                    body: obj.properties.data.body,
                    header: setting.color_header || '#714B67',
                    footer: setting.color_footer || '#714B67',
                    background: setting.color_background || 'white',
                    color: setting.color_text || 'white',
                    border: setting.color_border || '#ced4da',
                })
            }
            obj.borderColor = '#ced4da';
            obj.width = 200;
            obj.height = 90;
            (obj.shape).margin = { left: 10, right: 10, top: 5, bottom: 5 };
            return obj;
            },
            getConnectorDefaults: function (connector, diagram) {
            connector.style = {
                strokeColor: '#714B67',
                strokeWidth: 2
            };
            connector.targetDecorator.style.fill  =  '#714B67';
            connector.targetDecorator.style.strokeColor  =  '#714B67';
            connector.type = 'Orthogonal';
            return connector;
            },
            setNodeTemplate: function (node) {
            node.annotations[0].content = node.data.name;
            node.style.fill = 'white';
            node.style.strokeColor = '#ced4da';
            node.style.strokeWidth = 1
            }

        });
        diagram.appendTo('#analytic_hierachy_form_view');
    }
}
HierachyK8s.props = {
    ...standardWidgetProps,
};
HierachyK8s.template = "hmv_analytic_hierachy.HierachyViewForm";

export const HierachyK8sView = {
    component: HierachyK8s,
};
registry.category("view_widgets").add("hierachy_k8s", HierachyK8sView);

