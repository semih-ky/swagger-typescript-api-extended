const { generateApiForTest } = require("../../helpers/generateApiForTest");
const { resolve } = require("path");
const validateGeneratedModule = require("../../helpers/validateGeneratedModule");
const createSchemaInfos = require("../../helpers/createSchemaInfos");
const assertGeneratedModule = require("../../helpers/assertGeneratedModule");

const schemas = createSchemaInfos({ absolutePathToSchemas: resolve(__dirname, "./") });

schemas.forEach(({ absolutePath, apiFileName }) => {
  generateApiForTest({
    testName: "--extract-enums option test",
    name: apiFileName,
    input: absolutePath,
    output: resolve(__dirname, "./"),
    extractEnums: true,
    generateClient: false,
    // extractRequestBody: true,
    // extractResponseBody: true,
    fixInvalidEnumKeyPrefix: "InvalidKey",
    enumKeyPrefix: "EKP",
    enumKeySuffix: "EKS",
    typePrefix: "TNP",
    typeSuffix: "TNS",
  }).then(() => {
    validateGeneratedModule(resolve(__dirname, `./${apiFileName}`));
    assertGeneratedModule(resolve(__dirname, `./${apiFileName}`), resolve(__dirname, `./expected.ts`));
  });
});
