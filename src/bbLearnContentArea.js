/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * bbLearnContentArea
 * - model for a Blackboard content area
 *
 * Data
 * - the courseId
 * - page title
 * - contentItems - array of dicts keyed on header and body containing cleaned up elements
 * - rawContentItems
 * - cardInterfaces - array of items that will become locations for card interfaces
 */

const DEFAULT_YEAR = "2021";
const DEFAULT_TERM = "3215";

export default class bbLearnContentArea {
  constructor() {
    // get the data
    this.setup();
    this.pageDetails();
    this.findCardInterfaces();
    this.calculateTermYear();

    this.showDetails();
  }

  get term() {
    return this.TERM;
  }

  get year() {
    return this.YEAR;
  }

  get editMode() {
    return this._editMode;
  }

  set editMode(mode) {
    this._editMode = mode;
  }

  showDetails() {
    console.log(`course title is ${this.courseTitle}`);
    console.log(`TERM is ${this.TERM} and YEAR is ${this.YEAR}`);
    console.log(`editMode ${this.editMode}`);
    console.log("---- cardInterface");
    console.log(this.cardInterfaces);
  }

  setup() {
    /* define variables based on Bb page type */
    /* used to identify important components in html */
    const bbUrlPattern = "listContent.jsp";
    this.editMode = document.location.href.indexOf(bbUrlPattern) === -1;
    this.pageId = "#content_listContainer";
    this.rowElement = "li";

    // get the content items
    this.rawContentItems = document.querySelectorAll(
      `${this.pageId} > ${this.rowElement}`
    );
    this.contentItems = [];
    this.rawContentItems.forEach((item) => {
      const heading = item.querySelector(".item h3");
      let body = item.querySelector(".details");
      // console.log(`BEFORE body ${body.innerHTML}`);

      // remove the vtbegenerated divs
      let vtbegeneratedDivs = body.querySelectorAll(".vtbegenerated");
      vtbegeneratedDivs.forEach((div) => {
        while (div.childNodes.length > 0) {
          body.insertBefore(div.childNodes[0], div);
        }
      });
      // console.log(`INTERMEDIATE body ${body.innerHTML}`);
      // replace the vtbegenerated_divs with paragraph tags
      // - TODO spans with attr data-ally-scoreindicator

      vtbegeneratedDivs = body.querySelectorAll(
        'div.vtbegenerated_div,div:not([class=""])'
      );
      vtbegeneratedDivs.forEach((div) => {
        let p = document.createElement("p");
        // insert the new p before the div
        p = div.parentNode.insertBefore(p, div);
        // put div's children into p
        while (div.childNodes.length > 0) {
          p.appendChild(div.childNodes[0]);
        }
        div.parentNode.removeChild(div);
      });

      // remove the context menuContainers and axScoreIndicator
      let menuContainers = body.querySelectorAll(
        ".contextMenuContainer,.axScoreIndicator"
      );
      menuContainers.forEach((menu) => {
        menu.parentNode.removeChild(menu);
      });

      // console.log(`AFTER body ${body.innerHTML}`);
      // remove newlines from the body innerHTML
      body.innerHTML = body.innerHTML
        .replace(/(?:\r\n|\r|\n)/g, " ")
        .replace(/&nbsp;/gi, " ");

      this.contentItems.push({ header: heading, body: body });
    });
  }

  pageDetails() {
    const menuLink = document.querySelector("#courseMenu_link");
    // TODO handle when there isn't one??
    this.courseTitle = menuLink.getAttribute("title");
    // TODO move this to controller?
    /*if (document.location.href.indexOf("listContent.jsp") > 0) {
      $(".gutweak").parents("li").hide();
    } */
  }

  /**
   * @desc Identify course term and year from this.courseTitle
   *
   * TODO
   * - how to handle QCM courses with different calendar
   */

  calculateTermYear(term = DEFAULT_TERM, year = DEFAULT_YEAR) {
    // get the course id which will be in brackets
    // e.g. Collapse 1731QCM Creative Studio Practices 1 (1731QCM_3211_SB)

    let m = this.courseTitle.match(/^.*\((.+)\)/);
    // we found a course Id, get the STRM value
    if (m) {
      let id = m[1];
      // break the course Id up into its components

      // Check for an OUA course (e.g. com10) where the letters are first
      let breakIdRe = new RegExp(
        "^([A-Z]+[0-9]+)_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$"
      );
      m = id.match(breakIdRe);

      // found an actual course site (rather than org site)
      if (m) {
        term = m[2];

        // set the year
        mm = term.match(/^[0-9]([0-9][0-9])[0-9]$/);
        if (mm) {
          year = 20 + mm[1];
        } else {
          year = DEFAULT_YEAR;
        }
      } else {
        // check for a normal GU course, numbers first

        // match an unjoined course
        //  course code_STRM_offering - 1731QCM_3211_SB
        //
        breakIdRe = new RegExp(
          "^([0-9]+[A-Z]+)_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$"
        );
        m = id.match(breakIdRe);

        if (m) {
          // found an actual course site (rather than org site)
          term = m[2];

          // set the year
          mm = term.match(/^[0-9]([0-9][0-9])[0-9]$/);
          if (mm) {
            year = 20 + mm[1];
          } else {
            year = DEFAULT_YEAR;
          }
        } else {
          // Match a joined course (no offering on the end)
          breakIdRe = new RegExp("^([0-9]+[A-Z]+)_([0-9][0-9][0-9][0-9])$");

          m = id.match(breakIdRe);

          // found an actual course site (rather than org site)
          if (m) {
            term = m[2];
            // set the year
            mm = term.match(/^[0-9]([0-9][0-9])[0-9]$/);
            if (mm) {
              year = 20 + mm[1];
            } else {
              year = DEFAULT_YEAR;
            }
          } else {
            // Match Y1 QCM courses e.g. 3526QCM_Y1_3211_SB
            breakIdRe = new RegExp(
              "^([0-9]+[A-Z]+)_(Y[0-9])_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$"
            );
            m = id.match(breakIdRe);
            if (m) {
              term = m[3];
              mm = term.match(/^[0-9]([0-9][0-9])[0-9]$/);
              if (mm) {
                year = 20 + mm[1];
              } else {
                year = DEFAULT_YEAR;
              }
            }
          }
        }
      }
      // if this is a QCM course (either offering of joined), then update term
      let qcmRe = new RegExp("^([0-9]+QCM)_([0-9][0-9][0-9][0-9])");
      let qcmRe2 = new RegExp("^([0-9]+QCM)_(Y[0-9])_([0-9][0-9][0-9][0-9])");
      // m = qcmRe.match(id);
      m = id.match(qcmRe);
      // let m2 = qcmRe2.match(id);
      let m2 = id.match(qcmRe2);
      if (m || m2) {
        term = term + "QCM";
      }
    }

    //    console.log( `cards.js::calculateTermYear - id is ${id} Term is ${term} Year is ${year}`);
    this.TERM = term;
    this.YEAR = year;
  }

  findCardInterfaces() {
    this.cardInterfaces = [];
    this.rawContentItems.forEach((item) => {
      const heading = item.querySelector(".item h3");
      if (heading.innerText.toLowerCase().includes("card interface")) {
        this.cardInterfaces.push(item);
      }
    });
  }
}
