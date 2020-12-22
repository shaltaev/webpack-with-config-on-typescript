import { join } from 'path';
import { WebpackPluginInstance, WatchIgnorePlugin, Configuration, RuleSetRule } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { isDev } from './apps/_utils/is_dev'

const tsRuleBase: RuleSetRule = {
    test: /\.ts$/i,
    loader: 'ts-loader',
}

const commonConfig: Configuration = {
    mode: isDev ? 'development' : 'production',
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
}

const serverPlugins: WebpackPluginInstance[] = [
    new WatchIgnorePlugin({
        paths: [join(__dirname, 'apps', 'web_app')]
    })
]

const tsRuleServer: RuleSetRule = {
    ...tsRuleBase,
    options: {
        configFile: join(__dirname, 'tsconfig.server.json')
    }
}

const serverConfig: Configuration = {
    entry: join(__dirname, 'apps', 'server' , 'src', 'index.ts'),
    output: {
        path: join(__dirname, 'dist', 'server'),
        filename: 'server.js'
    },
    target: 'node',
    plugins: serverPlugins,
    module: {
        rules: [tsRuleServer]
    }
}

const webAppPlugins: WebpackPluginInstance[] = [
    new HtmlWebpackPlugin(),
    new WatchIgnorePlugin({
        paths: [join(__dirname, 'apps', 'server')]
    })
]

const tsRuleWebApp: RuleSetRule = {
    ...tsRuleBase,
    options: {
        configFile: join(__dirname, 'tsconfig.web_app.json')
    }
}

const webAppConfig: Configuration = {
    entry: join(__dirname, 'apps', 'web_app' , 'src', 'index.ts'),
    output: {
        path: join(__dirname, 'dist', 'web_app'),
        filename: 'bundle.js'
    },
    target: 'web',
    plugins: webAppPlugins,
    module: {
        rules: [tsRuleWebApp]
    }
}

export default [
    /** server  **/ {...commonConfig, ...serverConfig},
    /** web_app **/ {...commonConfig, ...webAppConfig},
]
