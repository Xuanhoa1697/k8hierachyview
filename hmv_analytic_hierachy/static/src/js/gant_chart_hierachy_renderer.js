/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { renderToElement } from "@web/core/utils/render";
import { useService } from "@web/core/utils/hooks";
import {
    Component,
    onMounted, 
    onWillStart ,
    onWillUpdateProps
} from "@odoo/owl";

export class AnalytichHierachyRenderer extends Component {
    setup() {
        this.orm = useService("orm");
        this.action = useService('action')
        this.is_to_exclude = true;
        onWillStart(async () => {
            await this.fetch_data()
        });

        onMounted(() => {
            this.renderView();
        });

        onWillUpdateProps((props) => {
          this.renderView();
      });
    }
    async fetch_data() {
        var self = this;
    }

    renderView() {
      $('#analytic_hierachy_view').empty();
      var self = this;
      var data = self.props.model.data;
      ej.diagrams.Diagram.Inject(ej.diagrams.DataBinding, ej.diagrams.HierarchicalTree);
      var DiagramConstraints = ej.diagrams.DiagramConstraints;

      var items = new ej.data.DataManager(data.data);
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
            obj.annotations[0].style.bold = true
            obj.annotations[0].style.color = "#d8dadd"
            border = '#d8dadd';
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
              header: data.color_header || '#714B67',
              footer: data.color_footer || '#714B67',
              background: data.color_background || 'white',
              color: data.color_text || 'white',
              border: data.color_border || '#ced4da'
            })
          }
          obj.borderColor = '#ced4da';
          obj.width = 231;
          obj.height = 105;
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
      diagram.appendTo('#analytic_hierachy_view');
      $('#analytic_hierachy_view').find('.o_kanban_gant_chart_record').click(ev=> {
        self.onOpenRecordHierachy(ev)
      })
    }

    onOpenRecordHierachy(ev) {
      var dataId = $(ev.currentTarget).attr('data-id');
      this.action.doAction({
        name: 'Change Inputs',
        type: "ir.actions.act_window",
        res_model: 'account.analytic.account',
        res_id: Number(dataId),
        views: [[false, 'form']],
        view_mode: "form",
        target: "current",
        context: {
          'form_view_ref': 'hmv_budget_base.view_account_analytic_account_hmv_budget_form'
        }
    });
    }
    
}

AnalytichHierachyRenderer.template = "hmv_analytic_hierachy.HierachyView";
AnalytichHierachyRenderer.props = {
    model: Object,
    onMarkerClick: Function,
};
