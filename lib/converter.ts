import { camelCase, capitalize } from 'lodash';

interface ApiResponse {
    definitions: Definitions;
}

interface DefinitionProperty {
  format: string;
  type: string;
  description?: string;
}

interface DefinitionProperties {
  [key: string]: DefinitionProperty;
}

interface Definition {
  required: string[];
  properties: DefinitionProperties;
  type: string;
  description?: string;
}

interface Definitions {
  [key: string]: Definition;
}

function generateSwiftType(name: string, properties: DefinitionProperties, requiredList: Definition["required"]) {
  let swiftCode = `struct ${capitalize(name)}: Codable {\n`;

  // Add properties
  for (const key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      const camelizedName = camelCase(key);
      const swiftType = convertType(properties[key].format);
      const required = requiredList.includes(key) ? '' : '?';
      const description = properties[key].description ? ` // ${properties[key].description?.trim().replace("\n", " ")}` : '';

      swiftCode += `  let ${camelizedName}: ${swiftType}${required} ${description}\n`;
    }
  }

  // Add enum CodingKeys
  swiftCode += `
  enum CodingKeys: String, CodingKey {
`;
  
  for (const key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      const camelizedName = camelCase(key);

      swiftCode += `    case ${camelizedName} = "${key}"\n`;
    }
  }

  swiftCode += `  }
`;

  swiftCode += "}\n";

  return swiftCode;
}

function convertType(format: string) {
  console.log("format: ", format);
  switch (format) {
    case 'integer':
      return 'Int';
    case 'integer[]':
      return '[Int]';
    case 'bigint':
      return 'Int';
    case 'bigint[]':
      return '[Int]';
    case 'smallint':
      return 'Int';
    case 'smallint[]':
      return 'Int';
    case 'boolean':
      return 'Bool';
    case 'boolean[]':
      return '[Bool]';
    case 'string':
      return 'String';
    case 'string[]':
      return '[String]';
    case 'float':
      return 'Float';
    case 'time with time zone':
    case 'timestamp with time zone':
    case 'timestamp without time zone':
    case 'date':
      return 'Date';
    case 'timestamp with time zone[]':
    case 'timestamp without time zone[]':
    case 'time with time zone[]':
    case 'date[]':
      return '[Date]';
    case 'uuid':
      return 'String';
    case 'uuid[]':
      return '[String]';
    case 'character varying':
      return 'String';
    case 'character varying[]':
      return '[String]';
    case 'text':
      return 'String';
    case 'text[]':
      return '[String]';
    case 'jsonb':
      return 'TO_DEFINE';
    case 'jsonb[]':
      return 'TO_DEFINE';
    case 'json':
      return 'TO_DEFINE';
    case 'json[]':
      return 'TO_DEFINE';
    default:
      throw(`Unknown type: ${format}`);
  }
}


function generateSwiftTypes(apiResponse: ApiResponse) {
    let swiftCode = '';
    
    const definitions = apiResponse.definitions;

  for (const name in definitions) {
    if (Object.prototype.hasOwnProperty.call(definitions, name)) {
      const definition = definitions[name];

      if (definition.type === 'object') {
        const properties = definition.properties;

        swiftCode += generateSwiftType(name, properties, definition.required);
      }
    }
  }

  return swiftCode;
}
  

export { generateSwiftTypes };
