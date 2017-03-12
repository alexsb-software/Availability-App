import { Component, Input } from '@angular/core';

import { Member } from '../logic/member';
import { saveAs } from 'file-saver';

import { MemberInfoHolderService } from '../app-services/member-info-holder.service';
import { SessionHolderService } from '../app-services/session-holder.service';
import { CommitteeService } from '../app-services/committee.service';
import { DayInfoHolderService } from '../app-services/day-info-holder.service';
import { FilterService } from '../app-services/filter.service';

@Component({
    selector: 'v2-save',
    templateUrl: './save.component.html',
    styles: []
})
export class SaveComponent {

    constructor(private memberService: MemberInfoHolderService,
        private sessionService: SessionHolderService,
        private committeeService: CommitteeService,
        private filterService: FilterService,
        private dayService: DayInfoHolderService) {

    }


    save(): void {
        let fileName = 'availability_app.json';

        saveAs(new Blob([
            "[" + JSON.stringify(this.decycle(this.memberService, true), null, 2) + ", " +
            JSON.stringify(this.decycle(this.sessionService, true), null, 2) + ", " +
            JSON.stringify(this.decycle(this.committeeService, true), null, 2) + ", " +
            JSON.stringify(this.decycle(this.filterService, true), null, 2) + ", " +
            JSON.stringify(this.decycle(this.dayService, true), null, 2) + "]"
        ], { type: "application/json" }), fileName);
    }

    /**
	 * Allows stringifing DOM elements.
	 *
	 * This is done in hope to identify the node when dumping.
	 *
	 * @param {Element} node DOM Node (works best for DOM Elements).
	 * @returns {String}
	 */
    stringifyNode(node): string {
        var text = "";
        switch (node.nodeType) {
            case node.ELEMENT_NODE:
                text = node.nodeName.toLowerCase();
                if (node.id.length) {
                    text += '#' + node.id;
                }
                else {
                    if (node.className.length) {
                        text += '.' + node.className.replace(/ /, '.');
                    }
                    if ('textContent' in node) {
                        text += '{textContent:'
                            + (node.textContent.length < 20 ? node.textContent : node.textContent.substr(0, 20) + '...')
                            + '}'
                            ;
                    }
                }
                break;
            // info on values: http://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-1841493061
            default:
                text = node.nodeName;
                if (node.nodeValue !== null) {
                    text += '{value:'
                        + (node.nodeValue.length < 20 ? node.nodeValue : node.nodeValue.substr(0, 20) + '...')
                        + '}'
                        ;
                }
                break;
        }
        return text;
    }

    decycle = function decycle(object, stringifyNodes) {
        'use strict';

        // Make a deep copy of an object or array, assuring that there is at most
        // one instance of each object or array in the resulting structure. The
        // duplicate references (which might be forming cycles) are replaced with
        // an object of the form
        //      {$ref: PATH}
        // where the PATH is a JSONPath string that locates the first occurance.
        // So,
        //      var a = [];
        //      a[0] = a;
        //      return JSON.stringify(JSON.decycle(a));
        // produces the string '[{"$ref":"$"}]'.

        // NOTE! If your object contains DOM Nodes you might want to use `stringifyNodes` option
        // This will dump e.g. `div` with id="some-id" to string: `div#some-id`.
        // You will avoid some problems, but you won't to be able to fully retro-cycle.
        // To dump almost any variable use: `alert(JSON.stringify(JSON.decycle(variable, true)));`

        // JSONPath is used to locate the unique object. $ indicates the top level of
        // the object or array. [NUMBER] or [STRING] indicates a child member or
        // property.

        var objects = [],   // Keep a reference to each unique object or array
            stringifyNodes = typeof (stringifyNodes) === 'undefined' ? false : stringifyNodes,
            paths = [];     // Keep the path to each unique object or array

        return (function derez(value, path) {

            // The derez recurses through the object, producing the deep copy.

            var i,          // The loop counter
                name,       // Property name
                nu;         // The new object or array

            // if we have a DOM Element/Node convert it to textual info.

            if (stringifyNodes && typeof value === 'object' && value !== null && 'nodeType' in value) {
                return this.stringifyNode(value);
            }

            // typeof null === 'object', so go on if this value is really an object but not
            // one of the weird builtin objects.

            if (typeof value === 'object' && value !== null &&
                !(value instanceof Boolean) &&
                !(value instanceof Date) &&
                !(value instanceof Number) &&
                !(value instanceof RegExp) &&
                !(value instanceof String)) {

                // If the value is an object or array, look to see if we have already
                // encountered it. If so, return a $ref/path object. This is a hard way,
                // linear search that will get slower as the number of unique objects grows.

                for (i = 0; i < objects.length; i += 1) {
                    if (objects[i] === value) {
                        return { $ref: paths[i] };
                    }
                }

                // Otherwise, accumulate the unique value and its path.

                objects.push(value);
                paths.push(path);

                // If it is an array, replicate the array.

                if (Object.prototype.toString.apply(value) === '[object Array]') {
                    nu = [];
                    for (i = 0; i < value.length; i += 1) {
                        nu[i] = derez(value[i], path + '[' + i + ']');
                    }
                } else {

                    // If it is an object, replicate the object.

                    nu = {};
                    for (name in value) {
                        if (Object.prototype.hasOwnProperty.call(value, name)) {
                            nu[name] = derez(value[name],
                                path + '[' + JSON.stringify(name) + ']');
                        }
                    }
                }
                return nu;
            }
            return value;
        }(object, '$'));
    };
}
