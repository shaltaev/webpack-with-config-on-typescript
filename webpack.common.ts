import {Configuration, RuleSetRule} from "webpack";
import {isDev} from "./apps/_utils";

export const tsRuleBase: RuleSetRule = {
    test: /\.ts$/i,
    loader: 'ts-loader',
}

export const commonConfig: Configuration = {
    mode: isDev ? 'development' : 'production',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
}
