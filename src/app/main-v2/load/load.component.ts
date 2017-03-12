import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Member } from './../logic/member';
import { Session } from './../logic/session';

import { MemberInfoHolderService } from '../app-services/member-info-holder.service';
import { SessionHolderService } from '../app-services/session-holder.service';
import { CommitteeService } from '../app-services/committee.service';
import { DayInfoHolderService } from '../app-services/day-info-holder.service';
import { FilterService } from '../app-services/filter.service';


@Component({
  selector: 'v2-load',
  templateUrl: './load.component.html'
})
export class LoadComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({});
  public reader: FileReader = new FileReader();

  ngOnInit() {
    this.setHandler();
  }

  constructor(private router: Router,
    private memberService: MemberInfoHolderService,
    private sessionService: SessionHolderService,
    private committeeService: CommitteeService,
    private filterService: FilterService,
    private dayService: DayInfoHolderService) {

  }


  private setHandler() {
    // Template code
    // TODO make this reusable
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      this.reader.onload = (e: any) => {
        let input = this.fixdata(e.target.result);
        let parsed = JSON.parse(input);

        this.loadMemberService(this.retrocycle(parsed[0]));
        // console.debug("member: ", this.memberService);

        this.loadSessionService(this.retrocycle(parsed[1]));
        // console.debug("session: ", this.sessionService);

        this.loadCommitteeService(this.retrocycle(parsed[2]));
        // console.debug("committee: ", this.committeeService);

        this.loadFilterService(this.retrocycle(parsed[3]));
        // console.debug("filter: ", this.filterService);

        this.loadDayService(this.retrocycle(parsed[4]));
        // console.debug("day: ", this.dayService);

        this.router.navigateByUrl('/memberassignment');

      };
      this.reader.readAsArrayBuffer(fileItem._file);

    };

  }

  loadMemberService(data): void {
    for (let member of data.members) {
      let mem = new Member();
      mem.name = member.name;
      mem.committees = member.committees;
      mem.shifts = member.shifts;
      for (let assignment of member.assigned) {
        mem.reserve(assignment.dayIndex, assignment.shiftIndex, assignment.committee);
      }

      this.memberService.members.push(mem);
    }
  }

  loadSessionService(data): void {
    for (let session of data.sessions) {
      let sess = new Session();
      sess.dayIndex = session.dayIndex;
      sess.endDate = session.endDate;
      sess.startDate = session.startDate;
      sess.shiftIndex = session.shiftIndex;
      sess.name = session.name;

      let arambeez = new Member();
      arambeez.name = session.reportingMember.name;
      arambeez.committees = session.reportingMember.committees;
      arambeez.shifts = session.reportingMember.shifts;
      for (let assignment of session.reportingMember.assigned) {
        arambeez.reserve(assignment.dayIndex, assignment.shiftIndex, assignment.committee);
      }

      sess.reportingMember = arambeez;

      let pr = new Member();
      pr.name = session.publicRelationsMember.name;
      pr.committees = session.publicRelationsMember.committees;
      pr.shifts = session.publicRelationsMember.shifts;
      for (let assignment of session.publicRelationsMember.assigned) {
        pr.reserve(assignment.dayIndex, assignment.shiftIndex, assignment.committee);
      }

      sess.publicRelationsMember = pr;

      this.sessionService.addSession(sess);
    }
  }

  loadCommitteeService(data): void {
    for (let committee of data.committees) {
      this.committeeService.insertCommittee(committee);
    }
  }

  loadFilterService(data): void {
    for (let committee of data.commiteeServices.committees) {
      this.filterService.insertCommittee(committee);
    }
  }

  loadDayService(data): void {
    this.dayService.objectToMap(data);
  }

  // Required for XSLX
  fixdata(data): string {
    let o = "", l = 0, w = 10240;
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
  }

  retrocycle = function retrocycle($) {
    'use strict';

    // Restore an object that was reduced by decycle. Members whose values are
    // objects of the form
    //      {$ref: PATH}
    // are replaced with references to the value found by the PATH. This will
    // restore cycles. The object will be mutated.

    // The eval function is used to locate the values described by a PATH. The
    // root object is kept in a $ variable. A regular expression is used to
    // assure that the PATH is extremely well formed. The regexp contains nested
    // * quantifiers. That has been known to have extremely bad performance
    // problems on some browsers for very long strings. A PATH is expected to be
    // reasonably short. A PATH is allowed to belong to a very restricted subset of
    // Goessner's JSONPath.

    // So,
    //      var s = '[{"$ref":"$"}]';
    //      return JSON.retrocycle(JSON.parse(s));
    // produces an array containing a single element which is the array itself.

    var px =
      /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;

    (function rez(value) {

      // The rez function walks recursively through the object looking for $ref
      // properties. When it finds one that has a value that is a path, then it
      // replaces the $ref object with a reference to the value that is found by
      // the path.

      var i, item, name, path;

      if (value && typeof value === 'object') {
        if (Object.prototype.toString.apply(value) === '[object Array]') {
          for (i = 0; i < value.length; i += 1) {
            item = value[i];
            if (item && typeof item === 'object') {
              path = item.$ref;
              if (typeof path === 'string' && px.test(path)) {
                value[i] = eval(path);
              } else {
                rez(item);
              }
            }
          }
        } else {
          for (name in value) {
            if (typeof value[name] === 'object') {
              item = value[name];
              if (item) {
                path = item.$ref;
                if (typeof path === 'string' && px.test(path)) {
                  value[name] = eval(path);
                } else {
                  rez(item);
                }
              }
            }
          }
        }
      }
    }($));
    return $;
  };

}