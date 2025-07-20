const { getDefaultConfig } = require('expo/metro-config')

const ALIASES = {
  tslib: require.resolve('tslib/tslib.es6.js'),
}

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,
})

config.resolver.resolveRequest = (context, moduleName, platform) => {
  return context.resolveRequest(
    context,
    ALIASES[moduleName] ?? moduleName,
    platform,
  )
}

module.exports = config
