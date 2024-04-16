import * as fs from 'fs';
import { XMLParser } from 'fast-xml-parser';

interface Sitemap {
    Tests: {
    TestSuite: {
        TestMethod: {
        Name: string; // Use '@_Name' to access attribute 'Name'
        Parameters: {
            Param: {
            Name: string; // Use '@_Name' to access attribute 'Name'
            '#text': string; // Use '#text' to access element's text content
            }[];
        };
        }[];
    };
    };
}

// Usage example:
const filePath = 'data.xml';

// Define a function to retrieve parameter list for a specific method
export function getParameterList(methodName: string, filepath: string="data.xml"): { [key: string]: string } {
    const sitemapXml = fs.readFileSync(filePath, 'utf8');
    const parser = new XMLParser({ attributeNamePrefix: '', ignoreAttributes: false });
    const sitemap: Sitemap = parser.parse(sitemapXml);
    const paramList: { [key: string]: string } = {};

    const method = sitemap.Tests.TestSuite.TestMethod.find(method => method.Name === methodName);

    if (method) {
    if (method.Parameters.Param) {
        const params = Array.isArray(method.Parameters.Param)
        ? method.Parameters.Param
        : [method.Parameters.Param];

        params.forEach(param => {
        const key = param.Name;
        const value = param['#text'];
        paramList[key] = value;
        });
    }
    } else {
    console.log(`Test Method "${methodName}" not found.`);
    }

    return paramList;
}