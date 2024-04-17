import * as fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

interface Sitemap {
    Tests: {
        TestSuite: {
            Name: string; // Use 'Name' to access attribute 'Name'
            TestMethod: {
                Name: string; // Use 'Name' to access attribute 'Name'
                Parameters: {
                    Param: {
                        Name: string; // Use 'Name' to access attribute 'Name'
                        '#text': string; // Use '#text' to access element's text content
                    }[];
                };
            }[];
        }[];
    };
}

// Set filePath:
const filePath = 'data.xml';

// Define a function to retrieve parameter list for a specific method
export function getParameterList(testSuiteName: string, methodName: string, filepath: string="data.xml"): { [key: string]: string } {
    const sitemapXml = fs.readFileSync(filePath, 'utf8');
    const parser = new XMLParser({ attributeNamePrefix: '', ignoreAttributes: false });
    const sitemap: Sitemap = parser.parse(sitemapXml);
    const paramList: { [key: string]: string } = {};

    const testSuites = Array.isArray(sitemap.Tests.TestSuite)
            ? sitemap.Tests.TestSuite
            : [sitemap.Tests.TestSuite];

            testSuites.forEach(testSuite => {
                if(testSuite.Name === testSuiteName){
                    console.log("------ Test Suite found "+ testSuite.Name + " -------")
                    
                    const testMethods = Array.isArray(testSuite.TestMethod)
                        ? testSuite.TestMethod
                        : [testSuite.TestMethod];

                        testMethods.forEach(testMethod =>{
                        if(testMethod.Name === methodName){
                            console.log("------ Test Method found "+ testMethod.Name + " -------")
                            const params = Array.isArray(testMethod.Parameters.Param)
                                ? testMethod.Parameters.Param
                                : [testMethod.Parameters.Param];

                                params.forEach(param => {
                                    const key = param.Name;
                                    const value = param['#text'];
                                    paramList[key] = value;
                                });
                        }
                    })
                }
            });
    return paramList; 
}