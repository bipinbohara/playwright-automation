"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParameterList = void 0;
var fs = require("fs");
var fast_xml_parser_1 = require("fast-xml-parser");
// Set filePath:
var filePath = 'data.xml';
// Define a function to retrieve parameter list for a specific method
function getParameterList(testSuiteName, methodName, filepath) {
    if (filepath === void 0) { filepath = "data.xml"; }
    var sitemapXml = fs.readFileSync(filePath, 'utf8');
    var parser = new fast_xml_parser_1.XMLParser({ attributeNamePrefix: '', ignoreAttributes: false });
    var sitemap = parser.parse(sitemapXml);
    var paramList = {};
    var testSuites = Array.isArray(sitemap.Tests.TestSuite)
        ? sitemap.Tests.TestSuite
        : [sitemap.Tests.TestSuite];
    testSuites.forEach(function (testSuite) {
        if (testSuite.Name === testSuiteName) {
            console.log("------ Test Suite found " + testSuite.Name + " -------");
            var testMethods = Array.isArray(testSuite.TestMethod)
                ? testSuite.TestMethod
                : [testSuite.TestMethod];
            testMethods.forEach(function (testMethod) {
                if (testMethod.Name === methodName) {
                    console.log("------ Test Method found " + testMethod.Name + " -------");
                    var params = Array.isArray(testMethod.Parameters.Param)
                        ? testMethod.Parameters.Param
                        : [testMethod.Parameters.Param];
                    params.forEach(function (param) {
                        var key = param.Name;
                        var value = param['#text'];
                        paramList[key] = value;
                    });
                }
            });
        }
    });
    return paramList;
}
exports.getParameterList = getParameterList;
