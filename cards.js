/* cardsInterface
 * - Given a Blackboard page with a list of items
 * - Find all the items using the expected card data format
 * - Insert into the first item on the page a cards interface
 
 
 * data format
 * - Card's indicating by "Card Image: URL" in the description, though the URL can be empty
 * - Card title - heading of Blackboard item
 * - Card Label - Specify the label to apply to the card (default Module)
 * - Module number - just the order in which they appear in the list
 * - picture - heading includes Card Image:**url** OR inserted image with title attribute = 'Card Image'
 * - description - the rest of the description
 * - DATE
 *   - Card Date: Mar 5
 *     Specify the date to be displayed
 *   - Card Date Label: Due
 *     Specify the label for the date - default Commencing
 */

var TERM_DATES = {
    
    // OUA 2021 Study Period 1
    "2211": {
        "0": { "start": "2021-02-22", "stop": "2021-02-28" },
        "1": { "start": "2021-03-01", "stop": "2021-03-07" },
        "2": { "start": "2021-03-08", "stop": "2021-03-14" },
        "3": { "start": "2021-03-15", "stCop": "2021-03-21" },
        "4": { "start": "2021-03-22", "stop": "2021-03-28" },
        "5": { "start": "2021-03-29", "stop": "2021-04-04" },
        "6": { "start": "2021-04-05", "stop": "2021-04-11" },
        "7": { "start": "2021-04-12", "stop": "2021-04-18" },
        "8": { "start": "2021-04-19", "stop": "2021-04-25" },
        "9": { "start": "2021-04-26", "stop": "2021-05-02" },
        "10": { "start": "2021-05-03", "stop": "2021-05-09" },
        "11": { "start": "2021-05-10", "stop": "2021-05-16" },
        "12": { "start": "2021-05-17", "stop": "2021-05-23" },
        "13": { "start": "2021-05-24", "stop": "2021-05-30" },
        "14": { "start": "2021-05-31", "stop": "2021-06-06" },
        /* End of study period 4 */
        "exam": { "start": "2021-05-31", "stop": "2021-06-06" },
        // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA 2021 Study Period 2
    "2213": {
        "0": { "start": "2021-05-31", "stop": "2021-06-06" },
        "1": { "start": "2021-06-07", "stop": "2021-06-13" },
        "2": { "start": "2021-06-14", "stop": "2021-06-20" },
        "3": { "start": "2021-06-21", "stop": "2021-06-27" },
        "4": { "start": "2021-06-28", "stop": "2021-07-04" },
        "5": { "start": "2021-07-05", "stop": "2021-07-11" },
        "6": { "start": "2021-07-12", "stop": "2021-07-18" },
        "7": { "start": "2021-07-19", "stop": "2021-07-25" },
        "8": { "start": "2021-07-26", "stop": "2021-08-01" },
        "9": { "start": "2021-08-02", "stop": "2021-08-08" },
        "10": { "start": "2021-08-09", "stop": "2021-08-15" },
        "11": { "start": "2021-08-16", "stop": "2021-08-22" },
        "12": { "start": "2021-08-23", "stop": "2021-08-29" },
        "13": { "start": "2021-08-30", "stop": "2021-09-05" },
        /* End of study period 4 */
        "exam": { "start": "2021-08-30", "stop": "2021-09-05" },
        // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA 2021 Study Period 3
    "2215": {
        "0": { "start": "2021-08-23", "stop": "2021-08-29" },
        "1": { "start": "2021-08-30", "stop": "2021-09-05" },
        "2": { "start": "2021-09-06", "stop": "2021-09-12" },
        "3": { "start": "2021-09-13", "stop": "2021-09-19" },
        "4": { "start": "2021-09-20", "stop": "2021-09-26" },
        "5": { "start": "2021-09-27", "stop": "2021-10-03" },
        "6": { "start": "2021-10-04", "stop": "2021-10-10" },
        "7": { "start": "2021-10-11", "stop": "2021-10-17" },
        "8": { "start": "2021-10-18", "stop": "2021-10-24" },
        "9": { "start": "2021-10-25", "stop": "2021-10-31" },
        "10": { "start": "2021-11-01", "stop": "2021-11-07" },
        "11": { "start": "2021-11-08", "stop": "2021-11-14" },
        "12": { "start": "2021-11-15", "stop": "2021-11-21" },
        "13": { "start": "2021-11-22", "stop": "2021-11-28" },
        "14": { "start": "2021-11-29", "stop": "2021-12-05" },
        /* End of study period 4 */
        "exam": { "start": "2021-11-29", "stop": "2021-12-05" },
        // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA 2021 Study Period 4 
    // TODO Yet to be added
        // Griffith 2021 Trimester 3
        "3218": {
            "0": { "start": "2021-11-01", "stop": "2021-11-07" },
            "1": { "start": "2021-11-08", "stop": "2021-11-14" },
            "2": { "start": "2021-11-15", "stop": "2021-11-21" },
            "3": { "start": "2021-11-22", "stop": "2021-11-28" },
            "4": { "start": "2021-11-29", "stop": "2021-12-05" },
            "5": { "start": "2021-12-06", "stop": "2021-12-12" },
            "6": { "start": "2021-12-13", "stop": "2021-12-19" },
            "7": { "start": "2021-12-20", "stop": "2021-12-26" },
            "8": { "start": "2022-01-10", "stop": "2022-01-16" },
            "9": { "start": "2022-01-17", "stop": "2022-01-23" },
            "10": { "start": "2022-01-24", "stop": "2022-01-30" },
            "11": { "start": "2022-01-31", "stop": "2022-01-06" },
            "12": { "start": "2022-02-07", "stop": "2022-02-13" },
            "13": { "start": "2022-02-14", "stop": "2022-02-20" },
            "exam": { "start": "2022-02-17", "stop": "2022-02-26" }
        },
        // Griffith 2021 Trimester 2
        "3215": {
            "0": { "start": "2021-07-12", "stop": "2021-07-18" },
            "1": { "start": "2021-07-19", "stop": "2021-07-25" },
            "2": { "start": "2021-07-26", "stop": "2021-08-01" },
            "3": { "start": "2021-08-02", "stop": "2021-08-08" },
            "4": { "start": "2021-08-16", "stop": "2021-08-22" },
            "5": { "start": "2021-08-23", "stop": "2021-08-29" },
            "6": { "start": "2021-08-30", "stop": "2021-09-05" },
            "7": { "start": "2021-09-06", "stop": "2021-09-12" },
            "8": { "start": "2021-09-13", "stop": "2021-09-19" },
            "9": { "start": "2021-09-20", "stop": "2021-09-26" },
            "10": { "start": "2021-09-27", "stop": "2021-10-03" },
            "11": { "start": "2021-10-04", "stop": "2021-10-10" },
            "12": { "start": "2021-10-11", "stop": "2021-10-17" },
            "13": { "start": "2021-10-18", "stop": "2021-10-24" },
            "14": { "start": "2021-10-25", "stop": "2021-10-31" },
            "exam": { "start": "2021-10-21", "stop": "2021-10-31" }
        },
        // Griffith 2021 Trimester 1
        "3211": {
            "0": { "start": "2021-03-01", "stop": "2021-03-07" },
            "1": { "start": "2021-03-08", "stop": "2021-03-14" },
            "2": { "start": "2021-03-15", "stop": "2021-03-21" },
            "3": { "start": "2021-03-22", "stop": "2021-03-29" },
            "4": { "start": "2021-03-29", "stop": "2021-04-04" },
            "5": { "start": "2021-04-12", "stop": "2021-03-18" },
            "6": { "start": "2021-04-19", "stop": "2021-04-25" },
            "7": { "start": "2021-04-26", "stop": "2021-05-02" },
            "8": { "start": "2021-05-03", "stop": "2021-05-09" },
            "9": { "start": "2021-05-10", "stop": "2021-05-16" },
            "10": { "start": "2021-05-17", "stop": "2021-05-23" },
            "11": { "start": "2021-05-24", "stop": "2021-05-30" },
            "12": { "start": "2021-05-31", "stop": "2021-06-06" },
            "13": { "start": "2021-06-07", "stop": "2021-03-13" },
            "exam": { "start": "2021-06-10", "stop": "2021-06-19" }
        },

    // OUA 2020 Study Period 1
    "2201": {
        "0": { "start": "2020-02-24", "stop": "2020-03-01" },
        "1": { "start": "2020-03-02", "stop": "2020-03-08" },
        "2": { "start": "2020-03-09", "stop": "2020-03-15" },
        "3": { "start": "2020-03-16", "stCop": "2020-03-22" },
        "4": { "start": "2020-03-23", "stop": "2020-03-29" },
        "5": { "start": "2020-03-30", "stop": "2020-04-05" },
        "6": { "start": "2020-04-06", "stop": "2020-04-12" },
        "7": { "start": "2020-04-13", "stop": "2020-04-19" },
        "8": { "start": "2020-04-20", "stop": "2020-04-26" },
        "9": { "start": "2020-04-27", "stop": "2020-05-03" },
        "10": { "start": "2020-05-04", "stop": "2020-05-10" },
        "11": { "start": "2020-05-11", "stop": "2020-05-17" },
        "12": { "start": "2020-05-18", "stop": "2020-05-24" },
        "13": { "start": "2020-05-25", "stop": "2020-05-31" },
        "14": { "start": "2020-06-01", "stop": "2020-06-05" },
        /* End of study period 4 */
        "exam": { "start": "2020-06-01", "stop": "2020-06-05" },
        // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA 2020 Study Period 2
    "2203": {
        "0": { "start": "2020-05-25", "stop": "2020-05-31" },
        "1": { "start": "2020-06-01", "stop": "2020-06-07" },
        "2": { "start": "2020-06-08", "stop": "2020-06-14" },
        "3": { "start": "2020-06-15", "stop": "2020-06-21" },
        "4": { "start": "2020-06-22", "stop": "2020-06-28" },
        "5": { "start": "2020-06-29", "stop": "2020-07-05" },
        "6": { "start": "2020-07-06", "stop": "2020-07-12" },
        "7": { "start": "2020-07-13", "stop": "2020-07-19" },
        "8": { "start": "2020-07-20", "stop": "2020-07-26" },
        "9": { "start": "2020-07-27", "stop": "2020-08-02" },
        "10": { "start": "2020-08-03", "stop": "2020-08-09" },
        "11": { "start": "2020-08-10", "stop": "2020-05-17" },
        "12": { "start": "2020-08-17", "stop": "2020-05-24" },
        "13": { "start": "2020-08-24", "stop": "2020-05-31" },
        "14": { "start": "2020-08-31", "stop": "2020-09-06" },
        /* End of study period 4 */
        "exam": { "start": "2020-08-31", "stop": "2020-09-04" },
        // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA 2020 Study Period 3
    "2205": {
        "0": { "start": "2020-08-24", "stop": "2020-09-30" },
        "1": { "start": "2020-08-31", "stop": "2020-09-06" },
        "2": { "start": "2020-09-07", "stop": "2020-09-13" },
        "3": { "start": "2020-09-14", "stop": "2020-09-20" },
        "4": { "start": "2020-09-21", "stop": "2020-09-27" },
        "5": { "start": "2020-09-28", "stop": "2020-10-04" },
        "6": { "start": "2020-10-05", "stop": "2020-10-11" },
        "7": { "start": "2020-10-12", "stop": "2020-10-19" },
        "8": { "start": "2020-10-19", "stop": "2020-10-25" },
        "9": { "start": "2020-10-26", "stop": "2020-11-01" },
        "10": { "start": "2020-11-02", "stop": "2020-11-08" },
        "11": { "start": "2020-11-09", "stop": "2020-11-15" },
        "12": { "start": "2020-11-16", "stop": "2020-11-22" },
        "13": { "start": "2020-11-23", "stop": "2020-11-29" },
        "14": { "start": "2020-11-30", "stop": "2020-12-06" },
        "15": { "start": "2020-12-07", "stop": "2020-12-13" },
        /* End of study period 4 */
        "exam": { "start": "2020-12-07", "stop": "2020-12-13" },
        // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA 2020 Study Period 4
    "2207": {
        "0": { "start": "2020-11-23", "stop": "2020-11-29" },
        "1": { "start": "2020-11-30", "stop": "2020-12-06" },
        "2": { "start": "2020-12-07", "stop": "2020-12-13" },
        "3": { "start": "2020-12-14", "stop": "2020-12-20" },
        "4": { "start": "2020-12-21", "stop": "2020-12-27" },
        "5": { "start": "2020-12-28", "stop": "2021-01-03" },
        "6": { "start": "2021-01-04", "stop": "2021-01-10" },
        "7": { "start": "2021-01-11", "stop": "2021-01-17" },
        "8": { "start": "2021-01-18", "stop": "2021-01-24" },
        "9": { "start": "2021-01-25", "stop": "2021-01-31" },
        "10": { "start": "2021-02-01", "stop": "2021-02-07" },
        "11": { "start": "2021-02-08", "stop": "2021-02-14" },
        "12": { "start": "2021-02-15", "stop": "2021-02-21" },
        "13": { "start": "2021-02-22", "stop": "2021-02-28" },
        "14": { "start": "2021-03-01", "stop": "2021-03-07" },
        "15": { "start": "2021-03-08", "stop": "2021-03-14" },
        /* End of study period 4 */
        "exam": { "start": "2021-03-01", "stop": "2021-03-07" },
        // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // Griffith 2020 Trimester 3
    "3208": {
        "0": { "start": "2020-10-26", "stop": "2020-11-01" },
        "1": { "start": "2020-11-02", "stop": "2020-11-08" },
        "2": { "start": "2020-11-09", "stop": "2020-11-15" },
        "3": { "start": "2020-11-16", "stop": "2020-11-22" },
        "4": { "start": "2020-11-23", "stop": "2020-11-29" },
        "5": { "start": "2020-11-30", "stop": "2020-12-06" },
        "6": { "start": "2020-12-07", "stop": "2020-12-13" },
        "7": { "start": "2020-12-14", "stop": "2020-12-20" },
        "8": { "start": "2021-01-04", "stop": "2021-01-10" },
        "9": { "start": "2021-01-11", "stop": "2021-01-17" },
        "10": { "start": "2021-01-18", "stop": "2021-01-24" },
        "11": { "start": "2021-01-25", "stop": "2021-01-31" },
        "12": { "start": "2021-02-01", "stop": "2021-02-07" },
        "13": { "start": "2021-02-08", "stop": "2021-02-14" },
        "exam": { "start": "2021-02-08", "stop": "2021-02-20" }
    },
    // Griffith 2020 Trimester 2
    "3205": {
        "0": { "start": "2020-07-06", "stop": "2020-07-12" },
        "1": { "start": "2020-07-13", "stop": "2020-07-19" },
        "2": { "start": "2020-07-20", "stop": "2020-08-26" },
        "3": { "start": "2020-07-27", "stop": "2020-08-02" },
        "4": { "start": "2020-08-03", "stop": "2020-08-16" },
        "5": { "start": "2020-08-17", "stop": "2020-08-23" },
        "6": { "start": "2020-08-24", "stop": "2020-08-30" },
        "7": { "start": "2020-08-31", "stop": "2020-09-06" },
        "8": { "start": "2020-09-07", "stop": "2020-09-13" },
        "9": { "start": "2020-09-14", "stop": "2020-09-20" },
        "10": { "start": "2020-09-21", "stop": "2020-09-27" },
        "11": { "start": "2020-09-28", "stop": "2020-10-04" },
        "12": { "start": "2020-10-05", "stop": "2020-10-11" },
        "13": { "start": "2020-10-12", "stop": "2020-10-18" },
        "14": { "start": "2020-10-19", "stop": "2020-10-25" },
        "15": { "start": "2020-10-27", "stop": "2020-11-01" },
        "exam": { "start": "2020-10-12", "stop": "2020-10-18" }
    },
    // Griffith 2020 Trimester 1
    "3201": {
        "0": { "start": "2020-02-17", "stop": "2020-02-23" },
        "1": { "start": "2020-02-24", "stop": "2020-03-01" },
        "2": { "start": "2020-03-02", "stop": "2020-03-08" },
        "3": { "start": "2020-03-09", "stop": "2020-03-15" },
        "4": { "start": "2020-03-16", "stop": "2020-03-22" },
        "5": { "start": "2020-03-23", "stop": "2020-03-29" },
        "6": { "start": "2020-03-30", "stop": "2020-04-05" },
        "7": { "start": "2020-04-13", "stop": "2020-04-19" },
        "8": { "start": "2020-04-20", "stop": "2020-04-26" },
        "9": { "start": "2020-04-27", "stop": "2020-05-03" },
        "10": { "start": "2020-05-04", "stop": "2020-05-10" },
        "11": { "start": "2020-05-11", "stop": "2020-05-17" },
        "12": { "start": "2020-05-18", "stop": "2020-05-24" },
        "13": { "start": "2020-05-25", "stop": "2020-05-31" },
        "exam": { "start": "2020-06-01", "stop": "2020-06-07" }
    },
    // Griffith 2019 Trimester 3
    "3198": {
        "0": { "start": "2019-10-21", "stop": "2019-10-27" },
        "1": { "start": "2019-10-28", "stop": "2019-11-03" },
        "2": { "start": "2019-11-04", "stop": "2019-11-10" },
        "3": { "start": "2019-11-11", "stop": "2019-11-17" },
        "4": { "start": "2019-11-18", "stop": "2019-11-24" },
        "5": { "start": "2019-11-25", "stop": "2019-12-1" },
        "6": { "start": "2019-12-02", "stop": "2019-12-08" },
        "7": { "start": "2019-12-09", "stop": "2019-12-15" },
        "8": { "start": "2019-12-16", "stop": "2019-12-22" },
        "9": { "start": "2020-01-06", "stop": "2020-01-12" },
        "10": { "start": "2020-01-13", "stop": "2020-01-19" },
        "11": { "start": "2020-01-20", "stop": "2020-01-26" },
        "12": { "start": "2020-01-27", "stop": "2020-02-02" },
        "13": { "start": "2020-02-03", "stop": "2020-02-09" },
        "exam": { "start": "2020-02-06", "stop": "2020-02-15" }
        // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA Study Period 4 2019
    "2197": {
        "0": { "start": "2019-11-18", "stop": "2019-11-24" },
        "1": { "start": "2019-11-25", "stop": "2019-12-01" },
        "2": { "start": "2019-12-02", "stop": "2019-12-08" },
        "3": { "start": "2019-12-09", "stop": "2019-12-15" },
        "4": { "start": "2019-12-16", "stop": "2019-12-22" },
        "5": { "start": "2019-12-23", "stop": "2019-09-29" },
        "6": { "start": "2019-12-30", "stop": "2020-01-05" },
        "7": { "start": "2020-01-06", "stop": "2020-01-12" },
        "8": { "start": "2020-01-13", "stop": "2020-01-19" },
        "9": { "start": "2020-01-20", "stop": "2020-01-26" },
        "10": { "start": "2020-01-27", "stop": "2020-02-02" },
        "11": { "start": "2020-02-03", "stop": "2020-02-09" },
        "12": { "start": "2020-02-10", "stop": "2020-02-16" },
        "13": { "start": "2019-02-17", "stop": "2020-02-23" },
        /* End of study period 4 */
        "14": { "start": "2020-02-24", "stop": "2020-03-01" },
        "15": { "start": "2020-03-02", "stop": "2020-03-08" },
        // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // OUA Study Period 3 2019
    "2195": {
        "0": { "start": "2019-08-19", "stop": "2019-09-25" },
        "1": { "start": "2019-08-26", "stop": "2019-09-01" },
        "2": { "start": "2019-09-02", "stop": "2019-09-18" },
        "3": { "start": "2019-09-09", "stop": "2019-09-15" },
        "4": { "start": "2019-09-16", "stop": "2019-09-22" },
        "5": { "start": "2019-09-23", "stop": "2019-09-29" },
        "6": { "start": "2019-09-30", "stop": "2019-10-06" },
        "7": { "start": "2019-10-07", "stop": "2019-10-13" },
        "8": { "start": "2019-10-14", "stop": "2019-08-20" },
        "9": { "start": "2019-10-21", "stop": "2019-10-27" },
        "10": { "start": "2019-10-28", "stop": "2019-11-03" },
        "11": { "start": "2019-11-04", "stop": "2019-11-10" },
        "12": { "start": "2019-11-11", "stop": "2019-11-17" },
        "13": { "start": "2019-11-18", "stop": "2019-11-24" },
        /* End of study period 3 */
        "14": { "start": "2019-11-25", "stop": "2019-12-01" },
        "15": { "start": "2019-10-07", "stop": "2019-10-13" },
        // No exam ?? "exam" : { "start": "2019-10-10", "stop" : "2019-10-19" }
    },
    // Griffith 2019 Trimester 2
    "3195": {
        "0": { "start": "2019-07-01", "stop": "2019-07-07" },
        "1": { "start": "2019-07-08", "stop": "2019-07-14" },
        "2": { "start": "2019-07-15", "stop": "2019-07-21" },
        "3": { "start": "2019-07-22", "stop": "2019-07-28" },
        "4": { "start": "2019-07-29", "stop": "2019-08-04" },
        "5": { "start": "2019-08-05", "stop": "2019-08-11" },
        "6": { "start": "2019-08-19", "stop": "2019-08-25" },
        "7": { "start": "2019-08-26", "stop": "2019-09-01" },
        "8": { "start": "2019-09-02", "stop": "2019-09-08" },
        "9": { "start": "2019-09-09", "stop": "2019-09-15" },
        "10": { "start": "2019-09-16", "stop": "2019-09-22" },
        "11": { "start": "2019-09-23", "stop": "2019-09-29" },
        "12": { "start": "2019-09-30", "stop": "2019-10-06" },
        "13": { "start": "2019-10-07", "stop": "2019-10-13" },
        "14": { "start": "2019-10-14", "stop": "2019-10-20" },
        "15": { "start": "2019-10-21", "stop": "2019-10-27" },
        "exam": { "start": "2019-10-10", "stop": "2019-10-19" }
    },
    "3191": {
        "0": { "start": "2019-02-18", "stop": "2019-02-24" },
        "1": { "start": "2019-02-25", "stop": "2019-03-03" },
        "2": { "start": "2019-03-04", "stop": "2019-03-10" },
        "3": { "start": "2019-03-11", "stop": "2019-03-17" },
        "4": { "start": "2019-03-18", "stop": "2019-03-24" },
        "5": { "start": "2019-03-25", "stop": "2019-03-31" },
        "6": { "start": "2019-04-01", "stop": "2019-04-07" },
        "7": { "start": "2019-04-08", "stop": "2019-04-14" },
        "8": { "start": "2019-04-22", "stop": "2019-04-28" },
        "9": { "start": "2019-04-29", "stop": "2019-05-05" },
        "10": { "start": "2019-05-06", "stop": "2019-05-12" },
        "11": { "start": "2019-05-13", "stop": "2019-05-19" },
        "12": { "start": "2019-05-20", "stop": "2019-05-26" },
        "13": { "start": "2019-05-27", "stop": "2019-06-02" },
        "14": { "start": "2019-06-03", "stop": "2019-06-09" },
        "15": { "start": "2019-06-10", "stop": "2019-06-17" },
        "exam": { "start": "2019-05-30", "stop": "2019-06-08" }
    }

};

// TERM/YEAR specify default period
// SET_DATE is used for testing activePic, specify a date strong for now
var TERM = "2207", DEFAULT_YEAR = 2021, SET_DATE = "";
var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const MONTHS_HASH = {
    "Jan" : 0, "January": 0,
    "Feb" : 1, "February": 1,
    "Mar" : 2, "March":2,
    "Apr" : 3, "April":3,
    "May" : 4, 
    "Jun" : 5, "June":5,
    "Jul" : 6, "July":6,
    "Aug" : 7, "August":7,
    "Sep" : 8, "September":8,
    "Oct" : 9, "October":9,
    "Nov" : 10, "November":10,
    "Dec" : 11, "December":11
}


// Interface design from https://codepen.io/njs/pen/BVdwZB


// TEMPLATES - by 6

// define the template types
const NUM_TEMPLATES = 6, HORIZONTAL = 0, // original 3 cards per row
    VERTICAL = 1, // 1 card per row 
    HORIZONTAL_NOENGAGE = 2, // original, but no engage
    PEOPLE = 5,
    ASSESSMENT = 6; // horizontal but show off people (BCI) version

// Whether or not xAPI logging is turned on
// - turned on by adding "logging" to Card Interface
var LOGGING = false;

// Define the wrapper around the card interface

var interfaceHtmlTemplate = Array(NUM_TEMPLATES);

// Kludge - hard code CSS path to enable shifting from
//          dev to live
//var CARDS_CSS="https://djon.es/gu/cards.css";
var CARDS_CSS = "https://s3.amazonaws.com/filebucketdave/banner.js/cards.css";



interfaceHtmlTemplate[HORIZONTAL] = `
<link rel="stylesheet" href="{CARDS_CSS}" />


<div id="guCardInterface" class="flex flex-wrap -m-3">
 {CARDS}
</div>
`;
interfaceHtmlTemplate[HORIZONTAL] = interfaceHtmlTemplate[HORIZONTAL].replace('{CARDS_CSS}', CARDS_CSS);

interfaceHtmlTemplate[VERTICAL] = `
<link rel="stylesheet" href="{CARDS_CSS}" />
 {CARDS}
</div>
`;
interfaceHtmlTemplate[VERTICAL] = interfaceHtmlTemplate[VERTICAL].replace('{CARDS_CSS}', CARDS_CSS);

interfaceHtmlTemplate[HORIZONTAL_NOENGAGE] = interfaceHtmlTemplate[HORIZONTAL];
interfaceHtmlTemplate[PEOPLE] = interfaceHtmlTemplate[HORIZONTAL];
interfaceHtmlTemplate[ASSESSMENT] = interfaceHtmlTemplate[HORIZONTAL];

// template for each individual card

var cardHtmlTemplate = Array(NUM_TEMPLATES);

cardHtmlTemplate[HORIZONTAL] = `
  <div class="clickablecard w-full sm:w-1/2 {WIDTH} flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="{LINK}" class="cardmainlink"></a>
      <div class="{BG_SIZE} h-48" style="background-image: url('{PIC_URL}'); background-color: rgb(255,255,255)">{IFRAME}
      </div>
      <div class="carddescription p-4 flex-1 flex flex-col">
        {LABEL} {MODULE_NUM}
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="mb-4 flex-1">
          {DESCRIPTION}
          
        </div>
         
         {LINK_ITEM}
         {REVIEW_ITEM}
         {EDIT_ITEM}
         {DATE} 
      </div>
    </div>
  </div>
`;

cardHtmlTemplate[VERTICAL] = `
<a href="{LINK}">
<div class="lg:flex xl:flex md:flex mb-4 rounded-lg shadow-lg hover:shadow-outline">
  <div class="lg:w-1/4 md:w-1/4 sm:w-full h-auto lg:flex-none bg-cover bg-center rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style="background-image: url('{PIC_URL}')">
        <img src="{PIC_URL}" style="opacity:0;width:50%" />
        {IFRAME}
  </div>
    <div class="p-2 m-2 lg:flex md:w-1/5 lg:w-1/5 sm:w-full">
        <h3>{TITLE}</h3>
    </div>
    <div class="carddescription m-2 p-2 lg:flex-initial md:w-1/2 lg:w-1/2 sm:w-full">
      <p class="text-grey-darker text-base">
        {DESCRIPTION} 
      </p>
      {LINK_ITEM}
      {EDIT_ITEM}
    </div>
</div>
</a>
`;

cardHtmlTemplate[HORIZONTAL_NOENGAGE] = `
  <div class="clickablecard w-full sm:w-1/2 {WIDTH} flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
    <a href="{LINK}" class="cardmainlink"></a>
      <div class="{BG_SIZE} h-48" style="background-image: url('{PIC_URL}');">
          {IFRAME}
      </div>
      <div class="p-4 flex-1 flex flex-col">
       
        {LABEL} {MODULE_NUM}
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="carddescription mb-4 flex-1">
          {DESCRIPTION}
        </div>
         {DATE} 
         {LINK_ITEM}
         {REVIEW_ITEM}
         {EDIT_ITEM}
      </div>
    </div>
  </div>
`;

// TODO - this might not be a better fit as something not a template?

cardHtmlTemplate[PEOPLE] = `
<!-- <style>
  .codegena{position:relative;width:100%;height:0;padding-bottom:56.27198%;
  .codegena iframe{position:absolute;top:0;left:0;width:100%;height:100%;}
</style>-->
  
  
  <div class="clickablecard w-full sm:w-1/2 md:w-1/2 flex flex-col p-3">
    <div class="hover:outline-none hover:shadow-outline bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col relative"> <!-- Relative could go -->
      <a href="{LINK}" class="cardmainlink"></a>
      <div class="w-full"><iframe src='https://player.vimeo.com/video/226525600?&title=0&byline=0'></iframe></div></a>
      <div class="p-4 flex-1 flex flex-col">
       <a href="{LINK}">
        {LABEL} {MODULE_NUM}
        <h3 class="mb-4 text-2xl">{TITLE}</h3>
        <div class="carddescription mb-4 flex-1">
          {DESCRIPTION}
          
        </div>
        </a>
         {LINK_ITEM}
         {EDIT_ITEM}
         {DATE} 
      </div>
    </div>
  </div>
`;

// Implement the assessment template

cardHtmlTemplate[ASSESSMENT] = `
<div class="clickablecard lg:max-w-full w-full lg:flex xl:flex md:flex mb-6 rounded-lg shadow-lg hover:shadow-outline"> 
    <!-- padding kludge -->
    <!-- <div>&nbsp;</div> -->
    <div class="h-auto">
          <a href="{LINK}" class="cardmainlink"></a>
          <h1 class="mt-2 ml-2 font-extrabold rounded-full h-16 w-16 flex items-center justify-center border-2 border-black bg-red text-white ">{MODULE_NUM}</h1>
          <p class="text-xs p-2 pr-6">Weight: <span class="font-bold">{WEIGHTING}</p>
        
        <!-- date -->
        {DATE}
        
    </div>
	<div class="m-2">&nbsp;</div>
	<div class="carddescription m-2">
          <div class="mb-4">
			<h3 class="font-bold">{TITLE}</h3>
			<p class="text-sm">{ASSESSMENT_TYPE}</p>
			<p class="text-sm">Learning outcomes: {LEARNING_OUTCOMES}</p>
		  </div>
		  
		  {DESCRIPTION}
		  
		  {LINK_ITEM}
		  {EDIT_ITEM}
		  
	</div>
</div>
`;

// template to add the "ENGAGE" link to (more strongly) indicate that the card links somewhere

var linkItemHtmlTemplate = Array(NUM_TEMPLATES);

linkItemHtmlTemplate[HORIZONTAL] = `
        <p>&nbsp;<br /> &nbsp;</p>
        <div class="p-4 absolute pin-r pin-b">
           <a href="{LINK}" class="gu-engage"><div class="hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
            {ENGAGE}
        </div></a>
        </div>
        `;

linkItemHtmlTemplate[VERTICAL] = '';
linkItemHtmlTemplate[HORIZONTAL_NOENGAGE] = '';
linkItemHtmlTemplate[PEOPLE] = '';
linkItemHtmlTemplate[ASSESSMENT] = '';

// TODO: need to decide how and what this will look like
//linkItemHtmlTemplate[1] = '<p><strong>Engage</strong></p>';
linkItemHtmlTemplate[VERTICAL] = '';
/*`
<div class="relative pin-r pin-b m-18"> <button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded"> Engage </button> 
        </div>`;*/

//*****************************************************************
// Templates for the "Mark Review" and "Reviewed" features

var markReviewLinkHtmlTemplate = Array(NUM_TEMPLATES);
var markUnReviewedLinkHtmlTemplate = Array(NUM_TEMPLATES);

markReviewLinkHtmlTemplate[HORIZONTAL] = `
<div class="p-4 absolute pin-l pin-b">
     <a href="{LINK}"><button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
     <span class="font-bold rounded-full px-2 py-1 bg-yellow text-black">&#x26a0;</span>&nbsp; {MARK_REVIEWED}</button></a>
</div>
        `;

markUnReviewedLinkHtmlTemplate[HORIZONTAL] = `
<div class="p-4 absolute pin-l pin-b">
    <a href="{LINK}"><button class="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">
                    <span class="font-bold rounded-full px-2 py-1 bg-green text-white">&#10003;</span>&nbsp;{REVIEWED}</button></a>
</div>
`;

markReviewLinkHtmlTemplate[VERTICAL] = '';
markUnReviewedLinkHtmlTemplate[VERTICAL] = '';
markReviewLinkHtmlTemplate[HORIZONTAL_NOENGAGE] = markReviewLinkHtmlTemplate[HORIZONTAL];
markUnReviewedLinkHtmlTemplate[HORIZONTAL_NOENGAGE] = markUnReviewedLinkHtmlTemplate[HORIZONTAL];
markReviewLinkHtmlTemplate[PEOPLE] = '';
markUnReviewedLinkHtmlTemplate[PEOPLE] = '';
markReviewLinkHtmlTemplate[ASSESSMENT] = '';
markUnReviewedLinkHtmlTemplate[ASSESSMENT] = '';

// Template for the calendar/date tab

var dateHtmlTemplate = Array(NUM_TEMPLATES);
var dualDateHtmlTemplate = Array(NUM_TEMPLATES);

dateHtmlTemplate[HORIZONTAL] = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute pin-t pin-r">
          <div class="bg-black text-white py-1 text-xs border-l border-r border-t border-black">
             {DATE_LABEL}
          </div>
          {WEEK}
          <div class="bg-red text-white py-1 border-l border-r border-black">
      	     {MONTH}
          </div>
          <div class="pt-1 border-l border-r border-b border-black rounded-b">
      	     <span class="text-2xl font-bold">{DATE}</span>
          </div>
        </div>
`;

dateHtmlTemplate[ASSESSMENT] = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24  pin-b pin-l"> 
          <div class="bg-black text-white py-1 text-xs">
             {DATE_LABEL}
          </div>
          {WEEK}
          <div class="bg-red text-white py-1">
      	     {MONTH}
          </div>
          <div class="pt-1 border-l border-r border-b rounded-b">
      	     <span class="text-2xl font-bold">{DATE}</span>
          </div>
        </div>
`;

dualDateHtmlTemplate[HORIZONTAL] = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24 absolute pin-t pin-r">
          <div class="bg-black text-white py-1 text-xs border-l border-r border-black">
             {DATE_LABEL}
          </div>
          {WEEK}
          <div class="bg-red text-white flex items-stretch py-1 border-l border-r border-black">
              <div class="w-1/2 flex-grow">{MONTH_START}</div>
              <div class="flex items-stretch border-l border-black flex-grow  -mt-1 -mb-1"></div>
              <div class="w-1/2">{MONTH_STOP}</div>
          </div>
          <div class="border-l border-r border-b text-center flex border-black items-stretch pt-1">
      	     <div class="w-1/2 text-2xl flex-grow font-bold">{DATE_START}</div>
      	     <div class="flex font-bolditems-stretch border-l border-black flex-grow -mt-1"></div>
              <div class="w-1/2 text-2xl font-bold">{DATE_STOP}</div>
          </div>
         </div> 
`;

dualDateHtmlTemplate[ASSESSMENT] = `
<div class="block rounded-t rounded-b overflow-hidden bg-white text-center w-24  pin-b pin-l">
          <div class="bg-black text-white py-1 text-xs border-l border-r border-t border-black">
             {DATE_LABEL}
          </div>
          {WEEK}
          <div class="bg-red text-white flex items-stretch py-1 border-l border-r border-black">
              <div class="w-1/2 flex-grow">{MONTH_START}</div>
              <div class="flex items-stretch border-l border-black flex-grow  -mt-1 -mb-1"></div>
              <div class="w-1/2">{MONTH_STOP}</div>
          </div>
          <div class="border-l border-r border-b text-center flex border-black items-stretch pt-1 rounded-b">
      	     <div class="w-1/2 text-2xl flex-grow font-bold">{DATE_START}</div>
      	     <div class="flex font-bolditems-stretch border-l border-black flex-grow -mt-1"></div>
              <div class="w-1/2 text-2xl font-bold">{DATE_STOP}</div>
          </div>
         </div> 
`;

weekHtmlTemplate = `
    <div class="bg-yellow-lighter text-black py-1">
      {WEEK}
    </div>
    `;

dualWeekHtmlTemplate = `
    <div class="bg-yellow-lighter text-black py-1 border-l border-r border-black">
      Week {WEEK_START} to {WEEK_STOP}
    </div>
    `;

examPeriodTemplate = `
<div class="bg-yellow-lighter text-black py-1 border-l border-r border-black">
      Exam Period
    </div>
`;

dateHtmlTemplate[VERTICAL] = dateHtmlTemplate[HORIZONTAL];
dateHtmlTemplate[HORIZONTAL_NOENGAGE] = dateHtmlTemplate[HORIZONTAL];
dateHtmlTemplate[PEOPLE] = '';
//dateHtmlTemplate[ASSESSMENT] = dateHtmlTemplate[HORIZONTAL];

dualDateHtmlTemplate[VERTICAL] = dualDateHtmlTemplate[HORIZONTAL];
dualDateHtmlTemplate[HORIZONTAL_NOENGAGE] = dualDateHtmlTemplate[HORIZONTAL];
dualDateHtmlTemplate[PEOPLE] = '';
//dualDateHtmlTemplate[ASSESSMENT] = dualDateHtmlTemplate[HORIZONTAL];

// Template to allow editors to view the original Bb content item
// Same for all templates
var editLinkTemplate = `
	        <div class="text-xs grey-light">
	           [<a href="#{ID}">View origin</a>]
	        </div>`;

// Message to display on a card if EDIT mode on and the item is hidden
HIDDEN_FROM_STUDENTS = `<div class="inline-block bg-yellow text-black text-xs rounded-t rounded-b">This item is <strong>hidden from students</strong></div>`;

// LOCATION > 0 means view mode. < 0 means EDIT mode
var LOCATION = 1;

INTRO_HTML = `
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

  <h3>Note</h3>

  <div class="mx-auto border-none box-content px-4 py-2">
    <div class="flex flex-wrap -mx-1 lg:-mx-4 p-0">

        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overlow-hidden rounded-lg shadow-lg h-full">
                <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
                    <h1 class="text-lg">
                            <i class="fa fa-exclamation-triangle text-red"></i>
                            Change with care
                    </h1>
                </header>
                <div class="p-2 md:p-4">
                    <p>Changes to this item may stop the Card Interface from working.</p>
                                        <p><strong>      <i class="fa fa-exclamation-triangle text-green"></i> Update (11 Jan 2021)</strong><br />
                    A change made by Blackboard required updates to the Card Interface. If you see any issues, please <a href="mailto:d.jones6@griffith.edu.au">email David Jones</a>.</p>
                </div>
            </article>
        </div>

        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overlow-hidden rounded-lg shadow-lg h-full">
                <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
                    <h1 class="text-lg">
                            <i class="fa fa-exclamation-triangle text-red"></i>
                            Do not hide the tweak code
                    </h1>
                </header>
                <div class="p-2 md:p-4">
                    <p>If this item is hidden the Card Interface will not work.</p>
                </div>
            </article>
        </div>

        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overlow-hidden rounded-lg shadow-lg h-full">
                <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
                    <h1 class="text-lg">
                            <i class="fa fa-info-circle text-orange"></i>
                            Cards are always last
                    </h1>
                </header>
                <div class="p-2 md:p-4">
                    <p>
                        You can add content to the Card Interface item using the <a target="_blank" href="https://help.blackboard.com/Learn/Administrator/Hosting/Tools_Management/Content_Editor"> 
                            Blackboard content editor</a>. But the cards will always appear after your content.
                    </p>
                </div>
            </article>
        </div>

    </div>
  </div>
`;

//---------------------
// Specify where the documentation is located

// Github version
DOCUMENTATION_LINKS = {
    'what' : 'https://djplaner.github.io/Card-Interface-Tweak/whatWhy/',
    'addingCI': 'https://djplaner.github.io/Card-Interface-Tweak/createCards/',
    'cardTypes': 'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#types-of-cards-information-and-navigation',
    'cardComponents': 'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#the-components-of-a-card',
    'addImage': 'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#adding-an-image',
    'addActiveImage': 'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#adding-an-_active-_image',
    'imageFit': 'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#changing-how-the-image-fits-the-card',
    'backgroundColour': 'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#using-a-background-colour',
    'useVideo': 'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#use-a-video-powerpoint-presentation-etc-instead',
    'changeDate': 'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#adding-a-date-or-date-range',
    'changeCardLabel': 'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#changing-the-card-label',
    'hideCard' : 'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#hiding-a-card',
    'enableReview' : 'https://djplaner.github.io/Card-Interface-Tweak/customiseACard/#enabling-review-status',
    // customise all cards
    'changeOrder' : 'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-change-the-order-of-cards',
    'changeEngage' : 'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-change-or-remove-the-engage-button',
    'templatesAndAttributes' : 'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-customise-templates-and-attributes',
    'arrangeVertical': 'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-arrange-cards-vertically-using-templatevertical',
    'cardsPerRow': 'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-change-the-number-of-cards-per-row-using-templateb1y123456',
    'assessment': 'https://djplaner.github.io/Card-Interface-Tweak/customiseAllCards/#how-to-use-the-assessment-template-templateassessment'
}

DOCUMENTATION_HTML = `

<div id="gu_card_intro"></div>

<h3>More information</h3>

  <div class="box-content mx-auto border-none h-auto py-0 px-4 m-0">
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overlow-hidden rounded-lg shadow-lg h-full">
                <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
                    <h1 class="text-lg">
                            Getting started
                    </h1>
                </header>
                <div class="p-2 md:p-4">
                    Learn about
                    <ul class="p-0 m-0">
                     <li class="p-0"> the <a target="_blank" href="${DOCUMENTATION_LINKS.what}">
                       what and why</a> of the Card Interface.</li>
                      <li> <a target="_blank" href="${DOCUMENTATION_LINKS.addingCI}">
                   adding the Card Interface</a> to a new Blackboard page. </li>
                      <li> <a target="_blank" href="${DOCUMENTATION_LINKS.cardTypes}">types of cards</a>.</li>
                      <li> <a target="_blank" href="${DOCUMENTATION_LINKS.cardComponents}">card components</a>.</li>
                  </ul>

                </div>
            </article>
        </div>

        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overlow-hidden rounded-lg shadow-lg h-full">
                <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
                    <h1 class="text-lg">
                            Customising a card
                    </h1>
                </header>
                <div class="p-2 md:p-4">
        How do you...
        <ul>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.addImage}">Add an image to a card</a>. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.addActiveImage}">Add an <em>active</em> image to a card</a>. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.imageFit}">fit an image</a> in a card. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.backgroundColour}">Use a background colour</a>, rather than an image. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.useVideo}">Add video or other embed type</a> to a card.</li>
           <li> Add or <a target="_blank" href="${DOCUMENTATION_LINKS.changeDate}">change the date or date range</a>. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.changeCardLabel}">Change the card label</a>. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.hideCard}">Hide a card</a>. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.enableReview}">Enable "Review Status"</a>. </li>
        </ul>
                </div>
            </article>
        </div>

        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article class="overlow-hidden rounded-lg shadow-lg h-full">
                <header class="flex items-center justify-between leading-tight p-2 md:p-4 border-b">
                    <h1 class="text-lg">
                           Customising all cards 
                    </h1>
                </header>
                <div class="p-2 md:p-4">
        How do you...   
         <ul>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.changeOrder}">Change the card order</a>. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.changeEngage}">Change the engage button</a>. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.arrangeVertical}">Arrange cards vertically</a>. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.cardsPerRow}">Change the number of cards per row</a>. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.assessment}">Use the assessment template</a>. </li>
           <li> <a target="_blank" href="${DOCUMENTATION_LINKS.templatesAndAttributes}">Learn about templates and attributes</a>. </li>
          </ul>
                </div>
            </article>
        </div>

    </div>
</div>
`;

// GLOBALS

const DEFAULT_CARD_LABEL="Module";

// Big kludge for HDR

function hideJourney($) {
    //console.log("---------- RUNNING THE tmp script");

    var tweak_bb_active_url_pattern = "listContent.jsp";
    window.tweak_bb = {
        display_view: (location.href.indexOf(tweak_bb_active_url_pattern) > 0),
        page_id: "#content_listContainer",
        row_element: "li"
    };

    var journeyTitle = jQuery(tweak_bb.page_id + " > " + tweak_bb.row_element).find(".item h3").filter(':contains("Your HDR Journey")').eq(0);
    //console.log(journeyTitle);
    var journey = jQuery(journeyTitle).parent().next('div.details').children('.vtbegenerated');
    //console.log(journey);
    var child = jQuery(journey).children(".yourJourney");
    //console.log(child);
    jQuery(child).unwrap();
}
/****
 * TODO
 * - Add a "right now" important way to highlight a card
 * - Configure the number of cards and width of cards (e.g. 2 for assessment)
 * - Fix issues with formatting within the card
 * - Explore the use of opacity to highlight the whole card?
 *     i.e. an overview that goes over the top? or perhaps just shade bottom same blue as the border with white text
 */

function cardsInterface($) {

    /* define variables based on Bb page type */
    /* used to identify important components in html */
    var tweak_bb_active_url_pattern = "listContent.jsp";
    window.tweak_bb = {
        display_view: (location.href.indexOf(tweak_bb_active_url_pattern) > 0),
        page_id: "#content_listContainer",
        row_element: "li"
    };

    /* Calculate actual term by using id="courseMenuLink"
     * - which includes the courseId */

    courseTitle = $("#courseMenu_link").attr('title');
    if (location.href.indexOf("listContent.jsp") > 0) {
        $(".gutweak").parents("li").hide();
    }

    // 
    jQuery('#gu_card_docs').html(DOCUMENTATION_HTML);
    jQuery('#gu_card_intro').html(INTRO_HTML);

    // Calculate the actual TERM for this course based on the 
    // courseId. If it doesn't parse, just leave it as the default
    // initialised term

    // get the course id which will be in brackets
    //idRe = new RegExp('\((.*)\)');
    m = courseTitle.match(/^.*\((.+)\)/);
    // we found a course Id, get the STRM value
    //console.log("got title " + courseTitle );
    if (m) {
        id = m[1];
        // break the course Id up into its components
        // This is the RE for COMM10 - OUA course?
        breakIdRe = new RegExp('^([A-Z]+[0-9]+)_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$');
        m = id.match(breakIdRe);


        // found an actual course site (rather than org site)	    
        if (m) {
            TERM = m[2];

            // set the year
            mm = TERM.match(/^[0-9]([0-9][0-9])[0-9]$/);
            if (mm) {
                YEAR = 20 + mm[1];
            } else {
                YEAR = DEFAULT_YEAR;
            }
        } else {
            // check for a normal GU course
            breakIdRe = new RegExp('^([0-9]+[A-Z]+)_([0-9][0-9][0-9][0-9])_([A-Z][A-Z])$');
            // Following is broken

            m = id.match(breakIdRe);

            // found an actual course site (rather than org site)	    
            if (m) {
                TERM = m[2];

                // set the year
                mm = TERM.match(/^[0-9]([0-9][0-9])[0-9]$/);
                if (mm) {
                    YEAR = 20 + mm[1];
                } else {
                    YEAR = DEFAULT_YEAR;
                }
            } else {
                breakIdRe = new RegExp('^([0-9]+[A-Z]+)_([0-9][0-9][0-9][0-9])$');

                m = id.match(breakIdRe);

                // found an actual course site (rather than org site)	    
                if (m) {
                    TERM = m[2];
                    // set the year
                    mm = TERM.match(/^[0-9]([0-9][0-9])[0-9]$/);
                    if (mm) {
                        YEAR = 20 + mm[1];
                    } else {
                        YEAR = DEFAULT_YEAR;
                    }
                }
            }
        }
    }

    LOCATION = location.href.indexOf("listContent.jsp");

    var cardInterface = jQuery(tweak_bb.page_id + " > " + tweak_bb.row_element).find(".item h3").filter( function(x) {
            return this.innerText.toLowerCase().includes("card interface");
        }
        ).eq(0);
    
    if (cardInterface.length === 0) {
        return false;
    }
    /* Get the titles and descriptions of the items on the page */
    var items = getCardItems($);

    /* generate the cards interface for the tiems */
    addCardInterface(items);

    // remove click event handler from engage buttons

    // Add event handler for the engage links
    /*jQuery(".gu-engage").click( function(e) {
            
            e.stopPropagation();
    });*/

    /** ------ cards should be created by now -- */
    /* But make all the links in carddescription stop propagation */
    var cardContent = jQuery(".carddescription [href]").not(".gu-engage");

    for (var i = 0; i < cardContent.length; i++) {
        cardContent[i].addEventListener('click', function (e) {
            // aim here is to allow internal links to override the 
            // cardmainlink
            e.stopPropagation();
        }, false);
    }

    /* Make all of the cards clickable by adding an event handler  */
    // Does this unwrap actually do anything???
    //jQuery( ".cardmainlink[href='undefined'" ).contents().unwrap();
    //return true;
    var cards = document.querySelectorAll(".clickablecard");
    //var cards = document.querySelectorAll(".cardmainlink");
    for (i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function (event) {
            var link = this.querySelector(".cardmainlink");
            
            if (link !== null) {
                // prevent clicking on a undefined blackboard link
                if (link.match(/blackboard\/content\/undefined$/)) {
                    console.log("Undefined");
                } else {
                    link.click();
                }
            }
        }, false);
    }



    // if we want the images to be hidden, hide them at the end
    if (HIDE_IMAGES) {
        jQuery(".bg-cover").hide();
    }
}

/***
 * Extract an array of items from the page that have been specified as part 
 * of the card interface
 */

function getCardItems($) {
    // Find all the items that containg Card Image: OR Card Image Iframe:
    // Case insensitive
    // This will include any Content Item that includes this string
    // even if it isn't meant to be a card
    var cardRE = new RegExp('(card image) ?(iframe)?:', 'i');

    var bbItems = jQuery(tweak_bb.page_id + " > " + tweak_bb.row_element).children(".details").children('.vtbegenerated').filter(
        function () {
            return match = this.innerHTML.match(cardRE);
        }
    );

    var cards = extractCardsFromContent(bbItems);

    return cards;
}
 

//-------------------------------------------------------------
// hash = extractCardMetaData( jQuery object)
// - given the description jQuery element
// - return a hash that contains 
//   - one entry for each Card meta data 
//     containing the html for just that meta data
//   - description entry - 
//     the rest of the jQuery object after the meta data has been
//     removed
// ??Assumes that metadata is divided into paragraphs
// Problem


const CARD_METADATA_FIELDS = [
    "card image", "card image iframe", "card image size", "card image active",
    "card label", "card number",
    "card date", "card date label",
    "assessment type", "assessment weighting", "assessment outcomes"
];

function extractCardMetaData( descriptionObject ) {
    // define hash to put values into it
    let metaDataValues = {};
    let description = jQuery(descriptionObject).html();
    // loop through all the possible meta data items and look for each
    CARD_METADATA_FIELDS.forEach( function(element) {
        // regex to remove the metadata element from the value
        let re = new RegExp( element + "\\s*:\\s*", "im" );
    
        // find all the paragraphs
        let elementContent = jQuery(descriptionObject).find("p");
        
        // just get the one with the current metadata element
        let x = jQuery(elementContent).filter( function(index) {
            return jQuery(this).text().match(re);
        })
        
        // if we found an element, then get it ready to pass back
        if ( jQuery(x).length!==0) {
            // remove the meta data field from the html that will be evaluated
            metaDataValues[element] = jQuery(x).html().replace( re, '');
            
            description = description.replace(jQuery(x).html(), '');
            metaDataValues[element]=metaDataValues[element].trim();
        }
    });
    
    // handle the inline image
    let inlineImage = jQuery(descriptionObject).find('img').attr('title', 'Card Image');
    if (inlineImage.length) {
        console.log("(((((((((((((((((((((((((((((((((((");
        metaDataValues['card image'] = inlineImage[0].src;
        //console.log("item html" + inlineImage[0].outerHTML);
        description = description.replace(inlineImage[0].outerHTML, "");
        // Bb also adds stuff when images inserted, remove it from 
        // description to be placed into card
        var bb = jQuery.parseHTML(description);
        // This will find the class
        stringToRemove = jQuery(description).find('.contextMenuContainer').parent().clone().html();
        description = description.replace(stringToRemove, '');
    }

    // add the description to the hash
    metaDataValues['description'] = description;
    // return the hash
    return metaDataValues;
}

//------------------------------------------------------
// FUNCTIONS to handle card meta data changes

// handleCardImage()
// - given value associated with "card image", could be URL or html

function handleCardImage(param) {
    let picUrl = "", cardBGcolour;
    
    // is it a data URI, just return it
    regex = /^data:((?:\w+\/(?:(?!;).)+)?)((?:;[\w\W]*?[^;])*),(.+)$/;
    if ( regex.test(param)){
        return param;
    } 
    
    // check to see if it's a colour, rather than an image
    // TODO might need to modify identifyPicUrl to remove extraneous
    // lead html if there is a href?? after img src is checked??
    picUrl = identifyPicUrl(param);
    cardBGcolour = identifyCardBackgroundColour(param);
                
    // TODO/CHECK previously there was a test to remove a trainling </p> from end
    // Maybe this should be handled in the picURL
    
   return [ picUrl.trim(), cardBGcolour];
}

// handleCardImageIframe
// - given the HTML for an iframe, modify any height/width params
//   to be more responsive

function handleCardImageIframe(param) {
    // replace the width and height
    x = param.match(/width="[^"]+"/i);
    if (x) {
        param = param.replace(x[0], 'width="100%"');
    }
    x = param.match(/height="[^"]+"/i);
    if (x) {
        param = param.replace(x[0], 'height="auto"');
    }
    return param;
}

// handleCardImageSize
// - return contain if set

function handleCardImageSize(param) {
    if ( param.includes("contain")  ) {
        return "contain";
    }
    return "";
}
    
//**************************************************
// handleCardDate( description )
// - given a description for an item find and parse Card Date
// - return an object that has two members
//   - start - start or only date {date:??,month:??}
//   - stop  - end date
// Options include
// - specify specific date by text
//          Card Date: Mar 5     
// - specify date by week of Griffith term (monday)
//          Card Date: Week 1
// - specify a date range
//          Card Date: Mar 5-Mar 10
//          Card Date: Week 3-5
// - specify a day of the week
//          Card Date: Monday Week 5
//          Card Date: Mon Week 5

function handleCardDate(param) {
    var month, endMonth, date, endDate, week = "", endWeek = "";
    var empty1 = { date: "", week: "" };
    var empty2 = { date: "", week: "" };
    var date = { start: empty1, stop: empty2 }; // object to return 
    // date by griffith week    

    m = param.match(/ *week ([0-9]*)/i);
    if (m) {
        // check to see if a range was specified
        x = param.match(/ *week ([0-9]*)-([0-9]*)/i);
        if (x) {
            week = x[1];
            endWeek = x[2];
            date.stop = getTermDate(endWeek, false);
        } else {
            week = m[1];
        }
        date.start = getTermDate(week)
    } else {
        // Handle the day of a semester week 
        // start date becomes start of week + number of days in
        m = param.match(
            / *\b(((mon|tues|wed(nes)?|thur(s)?|fri|sat(ur)?|sun)(day)?))\b *week *([0-9]*)/i);
        if (m) {
            day = m[1];
            week = m[m.length - 1];
            date.start = getTermDate(week, true, day)
        } else {
            // TODO need to handle range here 
            m = param.match(/ *([a-z]+) ([0-9]+)/i);
            if (m) {
                x = param.match(/ *([a-z]+) ([0-9]+)-+([a-z]+) ([0-9]+)/i);
                if (x) {
                    date.start = { month: x[1], date: x[2] }
                    date.stop = { month: x[3], date: x[4] }
                } else {
                    date.start = { month: m[1], date: m[2] };
                }
            } else {
                // Fall back to check for exam period
                m = param.match(/ *exam *(period)*/i);
                if (m) {
                    date.start = getTermDate('exam');
                    date.stop = getTermDate('exam', false);
                }
            }
        }
    }
    return date;
}                

// Given some HTML, remove all the HTML code, trim and return the text

function cleanTrimHtml(html) {
    const aux = document.createElement('div');
    aux.innerHTML = html;
    return aux.innerText.trim();
}
// handleCardLabelNumber
// - given hash with last number for each label type and label and number
//   return the appropriate [ label, number] to use for the card
// - label is the label specified for the card, 
//   - if nothing, default to module
// - number specify card number, 
//   - if nothing & nothing in numbering element set to 1, 
//   - else set to the next value from numbering element
// Labels can only ever be text


// storage for the multiple label numberings used across all cards
var CARD_LABEL_NUMBERING = {};
    
function handleCardLabelNumber(label,number) {
    // Handle the cases where label is
    // - empty - we don't want a label
    // - undefined - we want the default label
    
    // ensure label is empty HTML (incl &nbsp; as empty)
    trimLabel = cleanTrimHtml(label);    
    
    if (trimLabel==="") {
        return [ "", ""]
    } else if ( typeof(label)==="undefined") {
        trimLabel=DEFAULT_CARD_LABEL;
    }
    
    // Update the numbering schemes
    // - no existing numbering, set to 1
    // - otherwise increment existing
    if ( !(trimLabel in CARD_LABEL_NUMBERING) ) {
        CARD_LABEL_NUMBERING[trimLabel]=1;
    }
    else { // if it does exist increment to next value 
        CARD_LABEL_NUMBERING[trimLabel]+=1;
    }
    
    // if specific number specified, set numbering to that
    if ( typeof(number)!=="undefined") {
        CARD_LABEL_NUMBERING[trimLabel]=parseInt(number);
    }
    
    return [trimLabel,CARD_LABEL_NUMBERING[trimLabel]];
}

//--------------------------------
// extractCardsFromContent( myCard)
// - given an array of cards (HTML) convert into a reasonabl edatastructure

function extractCardsFromContent(myCards) {

    let items = [];
    // reset card numbering
    CARD_LABEL_NUMBERING={};
        
    // Loop through each card and construct the items array with card data
    myCards.each(function (idx) {
        // jQuery(this) - is the vtbgenerated div for a BbItem

        //------- check for any review status element
        review = getReviewStatus(this);

        // Parse the description and remove the Card Image data	  
        // vtbegenerated_div is specific to Blackboard.
        // But it also appears to change all <p> with a class to div with 
        // the match class, hence the not[class] selector
        jQuery(this).children('div.vtbegenerated_div,div:not([class=""])').replaceWith(
            function(){
                return jQuery("<p />", {html: jQuery(this).html()});
            }
        );
        var description = jQuery(this).html();

        // - get rid of any &nbsp; inserted by Bb
        description = description.replace(/&nbsp;/gi, ' ');
        description = description.replace(/\n/gi, '');

        // extract all the possible meta data
        let cardMetaData = extractCardMetaData(this);
        
        // now have cardMetaData with all meta data and the non meta data 
        // description. Need to make the necessary changes based on data
        // loop through each of the elements (but not description)
        
        // tmp variables used to hold results before putting into single card object
        let bgSize = "", dateLabel="Commencing", picUrl, cardBGcolour;
        let label = DEFAULT_CARD_LABEL, activePicUrl = "", number="&nbsp;", iframe="";
        let date;
        let assessmentType = "", assessmentWeighting = "", assessmentOutcomes = "";
        
        for ( let index in cardMetaData) {
            switch (index) {
                case "card image": 
                    [picUrl,cardBGcolour]=handleCardImage(cardMetaData[index]);
                    break;
                case "card image active": 
                    [activePicUrl,cardBGcolour]=handleCardImage(cardMetaData[index]); 
                    break;
                case "card image iframe": 
                    iframe=handleCardImageIframe(cardMetaData[index]); 
                    break;
                case "card image size": 
                    bgSize=handleCardImageSize(cardMetaData[index]); 
                    break; 
                case "card date": 
                    date=handleCardDate(cardMetaData[index]); 
                    break; 
                case "card date label": 
                    dateLabel=cardMetaData[index]; 
                    break;
                case "assessment type": 
                    assessmentType=cardMetaData[index]; 
                    break; 
                case "assessment weighting": 
                    assessmentWeighting=cardMetaData[index]; 
                    break;
                case "assessment outcomes": 
                    assessmentOutcomes=cardMetaData[index]; 
                    break;
            }
        }
        // handle card label and card number together
        [ label, number ] = handleCardLabelNumber(
                cardMetaData['card label'], cardMetaData['card number']);
                                    
        // description changed to remove all the meta data 
        description = cardMetaData["description"];
       
        // TODO is this still used?
        // Find any ItemDetailsHeaders that indicate the item is hidden
        hidden = jQuery(this).parent().find('.contextItemDetailsHeaders').filter(":contains('Item is hidden from students.')");
        //.siblings('contextItemDetailsHeaders')

        // Grab the link that the card is pointing to
        // need to get back to the header which is up one div, a sibling, then span
        var header = jQuery(this).parent().siblings(".item").find("span")[2];
        var title = jQuery(header).html(), link, linkTarget = '';
        
        //--------------------------------
        // Three options for link
        // 1. A link on the header (e.g. content folder)
        // 2. No link (e.g. a content item)
        // 3. A link in the attached filed (content item with attached file)
        //    This one is kludgy. e.g. doesn't handle multiple files. 
        //    Currently sets the link to the last file
        //    TODO figure out what do with multiple files
        link = jQuery(header).parents('a').attr('href');
        linkTarget = jQuery(header).parents("a").attr("target");

        // if link is empty, must be content item
        if (link === undefined) {
            // check to see if there are attached fileds
            filesThere = jQuery(this).parent().find('.contextItemDetailsHeaders').filter(":contains('Attached Files:')");

            if (filesThere !== undefined) {
                // get a list of all attached files
                lis = jQuery(this).parent().find('.contextItemDetailsHeaders').children('.detailsValue').children("ul").children("li");

                // loop through the files and get the link
                lis.each(function (idx, li) {
                    // get the link
                    link = jQuery(li).children("a").attr("href");
                });
            }
            //.siblings('contextItemDetailsHeaders')
        }


        // get the itemId to allow for "edit" link in card
        var itemId = jQuery(this).parents('.liItem').attr('id');
        //console.log("Item id " + itemId + " for link " + link );
        // Hide the contentItem  TODO Only do this if display page
        var tweak_bb_active_url_pattern = "listContent.jsp";
        if (location.href.indexOf(tweak_bb_active_url_pattern) > 0) {
            // TODO un comment this Reviewed
            jQuery(this).parent().parent().hide();
            //console.log( "content item " + contentItem.html());
        }
        // save the item for later
        var item = {
            title: title, picUrl: picUrl, bgSize: bgSize,
            cardBGcolour: cardBGcolour,
            description: description, date: date, label: label,
            link: link, linkTarget: linkTarget,
            review: review,
            dateLabel: dateLabel, id: itemId, activePicUrl: activePicUrl,
            assessmentWeighting: assessmentWeighting,
            assessmentOutcomes: assessmentOutcomes,
            assessmentType: assessmentType
        };
        if (number !== 'x') {
            item.moduleNum = number;
        }
        if (iframe !== '') {
            item.iframe = iframe;
        }

        // only add the card to display if
        // - VIEW MODE is on and it's not hidden
        // - EDIT MODE is on 
        if (hidden.length === 0 || LOCATION < 0) {
            // add message that item is hidden to students when EDIT mode on
            if (hidden.length === 1) {
                item.description = item.description.concat(HIDDEN_FROM_STUDENTS);
            }
            items.push(item);
        }
    });

    //console.log(items);
    return items;
}

/****
 * addCardInterface( items )
 * - Given an array of items to translate into cards add the HTML etc
 *   to generate the card interface
 * - Add the card interface to any item that has a title including
 *     "Card Interface:" with an optional title
 * 
 */

function addCardInterface(items) {

    // Define which template to use 
    var template = HORIZONTAL;
    var engageVerb = 'Engage';

    // Define the text for Review Status
    var MARK_REVIEWED = "Mark Reviewed"
    var REVIEWED = "Reviewed";

    // get the content item with h3 heading containing Card Interface
    var cardInterface = jQuery(tweak_bb.page_id + " > " + tweak_bb.row_element).find(".item h3").filter( function(x) {
            return this.innerText.toLowerCase().includes("card interface");
        }
        ).eq(0);


    if (cardInterface.length === 0) {
        console.log("Card: Can't find item with heading 'Card Interface' in which to insert card interface");
        return false;
    } else {
        // get the title - text only, stripped of whitespace before/after
        var cardInterfaceTitle = jQuery.trim(cardInterface.text());


        //Extract parameters
        var m = cardInterfaceTitle.match(/Card Interface *([^<]*)/i);
        WIDTH = 'md:w-1/3';
        HIDE_IMAGES = false;
        if (m) {
            newParams = parse_parameters(m[1]);

            if (newParams) {
                newParams.forEach(function (element) {
                    m = element.match(/template=["']vertical['"]/i);
                    m1 = element.match(/template=vertical/i);
                    if (m || m1) {
                        template = VERTICAL;
                    } else if (element.match(/template=['"]horizontal['"]/i)) {
                        template = HORIZONTAL;
                    } else if (element.match(/noimages/)) {
                        HIDE_IMAGES = true;
                    } else if (x = element.match(/template=by([2-6])/i)) {
                        WIDTH = "md:w-1/" + x[1];
                    } else if (x = element.match(/by([2-6])/i)) {
                        WIDTH = "md:w-1/" + x[1];
                    } else if (x = element.match(/[Bb][yY]1/)) {
                        WIDTH = "md:w-full";
                    } else if (element.match(/people/i)) {
                        template = PEOPLE;
                    } else if (element.match(/noengage/i)) {
                        template = HORIZONTAL_NOENGAGE;
                    } else if (element.match(/logging/i)) {
                        LOGGING = true;
                    } else if (m = element.match(/engage=([^']*)/)) {
                        engageVerb = m[1];
                    } else if (m = element.match(/template=assessment/i)) {
                        template = ASSESSMENT;
                    } else if (m = element.match(/set[Dd]ate=([^\s]*)/)) {
                        SET_DATE = m[1];
                    } else if (m = element.match(/^reviewed=([^']*)/ui)) {
                        REVIEWED = m[1];
                    } else if (m = element.match(/^markReviewed=(.+)/i)) {
                        MARK_REVIEWED = m[1];
                    }
                });
            }
        } // if no match, stay with default
    }

    //  console.log("LOGGING IS " + LOGGING);
    // make the h3 for the Card Interface item disappear
    // (Can't hide the parent as then you can't edit via Bb)
    // Need to have the span in order to be able to reorder
    cardInterface.html('<span class="reorder editmode"></span>');
    // Get the content area in which to insert the HTML
    var firstItem = cardInterface.parent().siblings(".details");

    // Use the card HTML template and the data in items to generate
    // HTML for each card
    var cards = "";
    var moduleNum = 1;
    items.forEach(function (idx) {
        var cardHtml = cardHtmlTemplate[template];
        cardHtml = cardHtml.replace('{WIDTH}', WIDTH);
        // replace the default background colour if a different one
        // is specific
        if (idx.cardBGcolour) {
            cardHtml = cardHtml.replace(/background-color:\s*rgb\(255,255,255\)/i, 'background-color: ' + idx.cardBGcolour);
        }

        //<div class="bg-cover h-48" style="background-image: url('{PIC_URL}'); //background-color: rgb(255,255,204)">{IFRAME}
        // replace the Engage verb

        //---------------------------------------------
        // Add in the mark review/reviewed options
        var reviewTemplate = '';
        if (idx.review !== undefined) {
            // only do it if there is a review option found
            // check whether its a mark review or review
            // - if link contains markUnreviewed then it has been
            //   reviewed
            if (idx.review.match(/markUnreviewed/)) {
                reviewTemplate = markUnReviewedLinkHtmlTemplate[template];
                reviewTemplate = reviewTemplate.replace('{REVIEWED}', REVIEWED)
            } else {
                // it's the other one which indicates it has not been reviewed
                reviewTemplate = markReviewLinkHtmlTemplate[template];

                reviewTemplate = reviewTemplate.replace('{MARK_REVIEWED}', MARK_REVIEWED)
            }
            // set the right link
            reviewTemplate = reviewTemplate.replace('{LINK}', idx.review);
        }
        cardHtml = cardHtml.replace('{REVIEW_ITEM}', reviewTemplate);
        //console.log("template is " + template);
        // Only show module number if there's a label
        if (idx.label !== '') {
            var checkForNum = idx.moduleNum;
            if (idx.moduleNum) {
                // if there's a hard coded moduleNum use that
                cardHtml = cardHtml.replace('{MODULE_NUM}', idx.moduleNum);
            } else {
                // use the one we're calculating
                //cardHtml = cardHtml.replace('{MODULE_NUM}',moduleNum);
                cardHtml = cardHtml.replace(/\{MODULE_NUM\}/g, moduleNum);
                checkForNum = moduleNum;
            }

            // Update the title, check to see if it starts with label and 
            // moduleNum.  If it does, remove them from the title
            // So that the card doesn't duplicate it, but the information is 
            // still there in Blackboard
            var regex = new RegExp('^' + idx.label + '\\s*' + checkForNum +
                '\\s*[-:]*\\s*(.*)', "s");
            //const regex = /^Week\s*1\s*[-:]*\s*(.*)/gs;
            
            var m = idx.title.match(regex);
            //var m = regex.test(idx.title);
            if (m) {
                idx.title = m[1];
            }
        } else {
            cardHtml = cardHtml.replace('{MODULE_NUM}', '');
        }
        cardHtml = cardHtml.replace('{LABEL}', idx.label);

        //------------------ set the card image

        // Two options for BG_SIZE
        // 1. cover (bg-cover)
        //    Default option. Image covers the entire backgroun
        // 2. contain (bg-contain bg-no-repeat) 
        //    Entire image must fit within the card

        if (idx.bgSize === 'contain') {
            cardHtml = cardHtml.replace(/{BG_SIZE}/,
                'bg-contain bg-no-repeat bg-center');
        } else {
            cardHtml = cardHtml.replace(/{BG_SIZE}/, 'bg-cover');
        }

        // figure out which image we're going to show
        var picUrl = setImage(idx);

        // replace the {IMAGE_URL} variable if none set
        if (!idx.hasOwnProperty('iframe')) {
            cardHtml = cardHtml.replace(/{IFRAME}/g, '');
        } else {
            cardHtml = cardHtml.replace(/{IFRAME}/g, idx.iframe);
            // set pic URl to empty so non is provided
            picUrl = ''
        }
        cardHtml = cardHtml.replace(/{PIC_URL}/g, picUrl);
        cardHtml = cardHtml.replace('{TITLE}', idx.title);
        cardHtml = cardHtml.replace(/\{ASSESSMENT[_ ]TYPE\}/g, idx.assessmentType);
        cardHtml = cardHtml.replace(/\{WEIGHTING\}/g, idx.assessmentWeighting);
        cardHtml = cardHtml.replace(/\{LEARNING_OUTCOMES\}/g, idx.assessmentOutcomes);

        // Get rid of some crud Bb inserts into the HTML
        description = idx.description.replace(/<p/g, '<p class="pb-2"');
        description = description.replace(/<a/g, '<a class="underline"');
        cardHtml = cardHtml.replace('{DESCRIPTION}', description);
        // Does the card link to another content item?
        //	    console.log( " template is " + template + " and H_E " + HORIZONTAL_NOENGAGE);
        if (idx.link) {
            // add the link

            linkHtml = linkItemHtmlTemplate[template];
            linkHtml = linkHtml.replace('{ENGAGE}', engageVerb);
            cardHtml = cardHtml.replace('{LINK_ITEM}', linkHtml);
            // if there is a label and no hard coded moduleNum, 
            //  then increment the module number
            // TENTATIVE
  /*          if (idx.label !== "" && !idx.moduleNum) {
                moduleNum++;
            }*/
        } else {// if (template!==HORIZONTAL_NOENGAGE) {
            // remove the link, as there isn't one
            cardHtml = cardHtml.replace('{LINK_ITEM}', '');
            cardHtml = cardHtml.replace(/<a href="{LINK}">/g, '');
            cardHtml = cardHtml.replace('</a>', '');
            // remove the shadow/border effect
            cardHtml = cardHtml.replace('hover:outline-none', '');
            cardHtml = cardHtml.replace('hover:shadow-outline', '');
            // don't count it as a module
          //  cardHtml = cardHtml.replace(idx.label + ' ' + moduleNum, '');
            //moduleNum--;
        }

        // If there is a linkTarget in Blackboard
        if (typeof idx.linkTarget !== 'undefined') {
            // replace "{LINK}" with "{LINK}" target="linkTarget"
            cardHtml = cardHtml.replace(/"{LINK}"/g, '"{LINK}" target="' +
                idx.linkTarget + '"');
        }

        if (typeof idx.link !== 'undefined') {
            cardHtml = cardHtml.replace(/{LINK}/g, idx.link);
        } else {
            cardHtml = cardHtml.replace(/<a href="{LINK}" class="cardmainlink">/g, '');
            cardHtml = cardHtml.replace(/class="clickablecard /, 'class="');
        }

        // Should we add a link to edit/view the original content
        if (location.href.indexOf("listContentEditable.jsp") > 0) {
            editLink = editLinkTemplate.replace('{ID}', idx.id);
            cardHtml = cardHtml.replace(/{EDIT_ITEM}/, editLink);
        } else {
            //cardHtml = cardHtml.replace(/{EDIT_ITEM}/,'');

            //editLink = editLinkTemplate.replace('{ID}', idx.id);
            editLink = '<div><a href="#hello">&nbsp;</a></div>';
            cardHtml = cardHtml.replace(/{EDIT_ITEM}/, editLink);
        }

        // If need add the date visualisation
        if (typeof(idx.date)!=="undefined" && typeof(idx.date.start)!=='undefined' && 'month' in idx.date.start) {
            // Do we have dual dates - both start and stop?
            if (idx.date.stop.month) {
                // start and stop dates
                cardHtml = cardHtml.replace('{DATE}', dualDateHtmlTemplate[template]);
                cardHtml = cardHtml.replace(/{MONTH_START}/g,
                    idx.date.start.month);
                cardHtml = cardHtml.replace(/{DATE_START}/g,
                    idx.date.start.date);
                cardHtml = cardHtml.replace(/{MONTH_STOP}/g,
                    idx.date.stop.month);
                cardHtml = cardHtml.replace(/{DATE_STOP}/g,
                    idx.date.stop.date);
                cardHtml = cardHtml.replace(/{DATE_LABEL}/g, idx.dateLabel);
                //           console.log(idx.date);
                if (!idx.date.start.hasOwnProperty('week')) {
                    cardHtml = cardHtml.replace('{WEEK}', '');
                } else {
                    // if exam, use that template
                    // other wise construct dual week
                    var weekHtml = examPeriodTemplate;
                    if (idx.date.start.week !== 'exam') {
                        weekHtml = dualWeekHtmlTemplate.replace('{WEEK_START}',
                            idx.date.start.week);
                        weekHtml = weekHtml.replace('{WEEK_STOP}',
                            idx.date.stop.week);
                    }
                    cardHtml = cardHtml.replace('{WEEK}', weekHtml);
                }
            } else {
                // just start date
                cardHtml = cardHtml.replace('{DATE}', dateHtmlTemplate[template]);
                cardHtml = cardHtml.replace(/{MONTH}/g, idx.date.start.month);
                cardHtml = cardHtml.replace(/{DATE}/g, idx.date.start.date);
                cardHtml = cardHtml.replace(/{DATE_LABEL}/g, idx.dateLabel);
                if (!idx.date.start.hasOwnProperty('week')) {
                    cardHtml = cardHtml.replace('{WEEK}', '');
                } else 
                    var weekReplace = "Week " + idx.date.start.week;
                    if ( idx.date.start.hasOwnProperty('day')) {
                        weekReplace = idx.date.start.day + " " + weekReplace;
                    }
                    var weekHtml = weekHtmlTemplate.replace('{WEEK}', weekReplace);
                cardHtml = cardHtml.replace('{WEEK}', weekHtml);
            }
        } else {
            // no dates at all
            cardHtml = cardHtml.replace('{DATE}', '');
        }
        cards = cards.concat(cardHtml);
    });

    // STick the cards into the complete card HTML
    var interfaceHtml = interfaceHtmlTemplate[template];
    interfaceHtml = interfaceHtml.replace('{CARDS}', cards);
    // Insert the HTML to the selected item(s)
    //return false;
    jQuery(firstItem).append(interfaceHtml);
}

//*********************
// getTermDate( week, day )
// - given a week of Griffith semester return date for the 
//   start of that week
// - optional pass day of the week, add more days Monday=0

function getTermDate(week, startWeek = true, dayOfWeek = 'Monday') {

    if ( typeof TERM_DATES[TERM]==='undefined') {
        return undefined
    }

    dayOfWeek = dayOfWeek.toLowerCase()
    //console.log("TERM is " + TERM + " week is " + week);
    var date = { date: "", month: "", week: week };
    if ((week < 0) || (week > 15)) {
        if (week !== 'exam') {
            return date;
        }
    }
    var start;
    if (startWeek === true) {
        // setting start week
        if (typeof TERM_DATES[TERM][week] !== 'undefined') {
            start = TERM_DATES[TERM][week].start;//[week].start;
        }
    } else {
        start = TERM_DATES[TERM][week].stop;
    }
    var d = new Date(start);

    // if dayOfWeek is not Monday, add some days
    if ( dayOfWeek !== 'monday') {
        var dayToNum = { 'tuesday' : 1, 'wednesday': 2, 'thursday':3, 'friday':4, 'saturday': 5, 'sunday': 6 };
        // add in the day abbreviation so it can appear
        date.day = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.substr(1,2);
        if ( dayOfWeek in dayToNum ) { 
            d.setDate( d.getDate() + dayToNum[dayOfWeek.toLowerCase()]);
        }
    }

    date.month = MONTHS[d.getMonth()];
    date.date = d.getDate();

    return date;
}

//*************************************************************
// picUrl = setImage( card )
// - given card object containing information about a card
// - return picUrl if no active card image
// - return picUrl if there is an active card image, but it's
//   not the date
// - return activePicUrl if there is one and it's not the date

function setImage(card) {
    
    // only use activePicURL if it is set and there are dates on
    // the card
    if (card.activePicUrl !== '' &&
        typeof(card.date) !== "undefined") {
        // there is an activePicUrl, check if it should be active

        // active means that the current date falls within the start/stop
        // dates for the card
        var start, stop, now;
        
        // Set now to current date OR SET_DATE if we want to do testing
        if (SET_DATE === "") {
            now = new Date();
        } else {
            now = new Date(SET_DATE);
        }

        // set the start date
        if (card.date.start.hasOwnProperty('month') &&
            card.date.start.month !== "") {

            start = new Date(parseInt(DEFAULT_YEAR), 
                    //MONTHS.indexOf(card.date.start.month), 
                    MONTHS_HASH[card.date.start.month],
                    parseInt(card.date.start.date));
        }
        
        // set the card stop date
        // - to card.date.stop if valid
        // - to the end of the week if using a week
        // - to the end of the day if no stop
        if (card.date.stop.hasOwnProperty('month') &&
            card.date.stop.month !== '') {
            stop = new Date(DEFAULT_YEAR, MONTHS_HASH[card.date.stop.month], card.date.stop.date);
            stop.setHours(23, 59, 0);
        } else if (card.date.start.hasOwnProperty('week')) {
            // there's no end date, but there is a start week
            // so set stop to end of that week
            if ( card.date.start.week in TERM_DATES[TERM]) {
                stop = new Date(TERM_DATES[TERM][card.date.start.week].stop);
                stop.setHours(23, 59, 0);
            } else {
              // problem with week, just set it to end of date
              if (typeof(start)!=="undefined") {
                stop = new Date(start.getTime());
                stop.setHours(23, 59, 0);
              }
            }
        } else { // no week for stop, meaning it's just on the day
            stop = new Date(start.getTime());
            stop.setHours(23, 59, 0);
        }

        if (now >= start && now <= stop) {
            return card.activePicUrl;
        }
    }
    return card.picUrl;
}

//**************************************************************
// cardBGcolour = identifyCardBackgroundColour( value );
// return undefined if value is not a valid CSS colour
// Otherwise return rgb(X,Y,Z)

function identifyCardBackgroundColour(input) {

    // don't both if it's an empty string or a URL (or relative URL)
    url = input.match(/^\s*http/i) || input.match(/^\//);
    if (input === "" || url) {
        return undefined;
    }
    var div = document.createElement('div'), m;
    div.style.color = input;
    // add to DOMTree to work
    document.body.appendChild(div);

    // extract the rgb numbers
    m = getComputedStyle(div).color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
    if (m) {
        return "rgb(" + m[1] + "," + m[2] + "," + m[3] + ")";
    }
    return undefined;
}



//**************************************************************
// picUrl = identifyPicUrl( value )
// TODO - return "" if value is not a valid URI
//   Otherwise return the value

function identifyPicUrl(value) {
    // try an img tag (without Card Image)
    let re = new RegExp('img src="([^"]*)', "i" );
    let m = value.match( re );
    
    // if it is return the picUrl
    if (m) {
        return m[1];
    }
    
    // is there a link to the image
    re = new RegExp('href="([^"]*)', "i" );
    m = value.match( re );
    
    // if it's a <a href="picUrl"></a> return the picUrl
    if (m) {
        return m[1];
    }
    
    // remove all html and just use the text content that's left
    let tmp = document.createElement("DIV");
    tmp.innerHTML = value;
    value = tmp.textContent || tmp.innerText || "";
    // must be just a lone URL TODO check it actually does
    return value;
}

//-----------------------------------------------------------------
// getReviewStatus
// - given a vtbgenerated item from Bb Item, check to see if the
//   parent div contains a review status element (anchor with class
//   button-5)
// - if not return NULL
// - if there is one return the link (which indicates with it's
//   mark reviewed, or reviewed)

function getReviewStatus(vtbgen) {
    // get parent    
    var parent = jQuery(vtbgen).parent();

    // check to see if it has the anchor with class button-5
    review = jQuery(parent).find("a.button-5");

    if (review.length === 0) {
        return undefined
    } else {
        return jQuery(review).attr("href");
    }
}

//---------------------------------------------------------------------
// Given a string of parameters use some Stack Overflow provided
// regular expression magic to split it up into its component parts

function parse_parameters(cmdline) {
    //    var re_next_arg = /^\s*((?:(?:"(?:\\.|[^"])*")|(?:'[^']*')|\\.|\S)+)\s*(.*)$/;
    var re_next_arg = /^\s*((?:(?:"(?:\\.|[^"])*")|(?:'[^']*')|\\.|\S)+)\s*(.*)$/;
    var next_arg = ['', '', cmdline];
    var args = [];
    while (next_arg = re_next_arg.exec(next_arg[2])) {
        var quoted_arg = next_arg[1];
        var unquoted_arg = "";
        while (quoted_arg.length > 0) {
            if (/^"/.test(quoted_arg)) {
                var quoted_part = /^"((?:\\.|[^"])*)"(.*)$/.exec(quoted_arg);
                unquoted_arg += quoted_part[1].replace(/\\(.)/g, "$1");
                quoted_arg = quoted_part[2];
            } else if (/^'/.test(quoted_arg)) {
                var quoted_part = /^'([^']*)'(.*)$/.exec(quoted_arg);
                unquoted_arg += quoted_part[1];
                quoted_arg = quoted_part[2];
            } else if (/^\\/.test(quoted_arg)) {
                unquoted_arg += quoted_arg[1];
                quoted_arg = quoted_arg.substring(2);
            } else {
                unquoted_arg += quoted_arg[0];
                quoted_arg = quoted_arg.substring(1);
            }
        }
        args[args.length] = unquoted_arg;
    }
    return args;
}