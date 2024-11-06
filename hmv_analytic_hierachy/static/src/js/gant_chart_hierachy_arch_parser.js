/** @odoo-module **/

import { unique } from "@web/core/utils/arrays";
import { visitXML } from "@web/core/utils/xml";
import { archParseBoolean } from "@web/views/utils";

export class AnalytichHierachyArchParser {
    parse(arch) {
        const archInfo = {
            fieldNames: [],
            fieldNamesMarkerPopup: [],
        };

        archInfo.fieldNames = unique(archInfo.fieldNames);
        archInfo.fieldNamesMarkerPopup = unique(archInfo.fieldNamesMarkerPopup);

        return archInfo;
    }
}
