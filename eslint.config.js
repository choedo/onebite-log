import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      /* 템플릿 코드에 추가된 부분 */
      "@typescript-eslint/no-unused-vars": "off", // 사용되지 않는 변수가 있을 경우 오류로 표시하는 옵션
      "@typescript-eslint/no-explicit-any": "off", // 명시적으로 변수 any 타입을 직접적으로 설정할 수 없게 할 수 있는 옵션
    },
  },
);
