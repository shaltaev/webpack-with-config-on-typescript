import {Configuration, RuleSetRule, WatchIgnorePlugin, WebpackPluginInstance} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {join} from "path";
import {tsRuleBase} from "../../webpack.common";

const webAppPlugins: WebpackPluginInstance[] = [
    new HtmlWebpackPlugin(),
    new WatchIgnorePlugin({
        paths: [join(__dirname, '..', 'apps', 'server')]
    })
]
const tsRuleWebApp: RuleSetRule = {
    ...tsRuleBase,
    options: {
        configFile: join(__dirname, 'tsconfig.json')
    }
}
export const webAppConfig: Configuration = {
    entry: join(__dirname, 'src', 'index.ts'),
    output: {
        path: join(__dirname, '..', '..', 'dist', 'web_app'),
        filename: 'bundle.js'
    },
    target: 'web',
    plugins: webAppPlugins,
    module: {
        rules: [tsRuleWebApp]
    }
}