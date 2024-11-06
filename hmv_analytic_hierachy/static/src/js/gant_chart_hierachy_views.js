/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { AnalytichHierachyArchParser } from "./gant_chart_hierachy_arch_parser";
import { AnalytichHierachyModel } from "./gant_chart_hierachy_model";
import { AnalytichHierachyController } from "./gant_chart_hierachy_controller";
import { AnalytichHierachyRenderer } from "./gant_chart_hierachy_renderer";

export const mapView = {
    type: "hierachy_analytic",
    display_name: _t("Hierachy"),
    icon: "fa fa-bar-chart",
    multiRecord: true,
    Controller: AnalytichHierachyController,
    Renderer: AnalytichHierachyRenderer,
    Model: AnalytichHierachyModel,
    ArchParser: AnalytichHierachyArchParser,
    buttonTemplate:  "hmv_analytic_hierachy.HierachyView.Buttons",

    props: (genericProps, view, config) => {
        let modelParams = genericProps.state;
        if (!modelParams) {
            const { arch,  resModel, fields, context} = genericProps;
            const parser = new view.ArchParser();
            const archInfo = parser.parse(arch);
            const views = config.views || [];
            modelParams = {
                context: context,
                defaultOrder: archInfo.defaultOrder,
                fieldNames: archInfo.fieldNames,
                fieldNamesMarkerPopup: archInfo.fieldNamesMarkerPopup,
                fields: fields,
                hasFormView: views.some((view) => view[1] === "form"),
                hideAddress: archInfo.hideAddress || false,
                hideName: archInfo.hideName || false,
                hideTitle: archInfo.hideTitle || false,
                limit: archInfo.limit || 80,
                numbering: archInfo.routing || false,
                offset: 0,
                panelTitle:
                    archInfo.panelTitle || config.getDisplayName() || _t("Items"),
                resModel: resModel,
                resPartnerField: archInfo.resPartnerField,
                routing: archInfo.routing || false,
            };
        }

        return {
            ...genericProps,
            Model: view.Model,
            modelParams,
            Renderer: view.Renderer,
            buttonTemplate: view.buttonTemplate,
        };
    },
};

registry.category("views").add("hierachy_analytic", mapView);
