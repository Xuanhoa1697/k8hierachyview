/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { Model } from "@web/model/model";
import { useService } from "@web/core/utils/hooks";

export class AnalytichHierachyModel extends Model {
    setup(params, context) {
        this.data = false
        this.orm = useService("orm");
            }

    async load(params) {
        var self = this
        this.data = await this._fetchRecordData(params)
    }

    async _fetchRecordData(params) {
        return await this.orm.call("hierachy.settings", "get_data_hierachy_analytic", [params.domain, params.context.params.model]);
    }
}

AnalytichHierachyModel.services = ["notification", "http"];
AnalytichHierachyModel.COORDINATE_FETCH_DELAY = 1000;
