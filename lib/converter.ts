import { camelCase, capitalize } from 'lodash';

interface ApiResponse {
    definitions: Definitions;
}

interface DefinitionProperty {
  format?: string;
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

function generateSwiftType(name: string, properties: DefinitionProperties) {
  let swiftCode = `struct ${capitalize(name)} {\n`;

  // Add properties
  for (const key in properties) {
    if (Object.prototype.hasOwnProperty.call(properties, key)) {
      const camelizedName = camelCase(key);
      const swiftType = convertType(properties[key].type);
      const description = properties[key].description ? ` // ${properties[key].description?.trim().replace("\n", " ")}` : '';

      swiftCode += `  let ${camelizedName}: ${swiftType}${description}\n`;
    }
  }

  swiftCode += "}\n";

  return swiftCode;
}

function convertType(type: string) {
  switch (type) {
    case 'integer':
      return 'Int';
    case 'boolean':
      return 'Bool';
    case 'string':
      return 'String';
    case 'float':
      return 'Float';
    case 'double':
      return 'Double';
    default:
      return 'String';
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

        swiftCode += generateSwiftType(name, properties);
      }
    }
  }

  return swiftCode;
}
  

export { generateSwiftTypes };
