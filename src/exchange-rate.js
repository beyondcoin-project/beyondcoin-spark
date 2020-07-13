import request from 'superagent'

// a proxy server can be specified using standard env variables (http(s)_proxy / all_proxy),
// see github.com/Rob--W/proxy-from-env for details
require('superagent-proxy')(request)

const rateProviders = {
  coingecko: {
    url: 'https://api.coingecko.com/api/v3/simple/price?ids=beyondcoin&vs_currencies=usd'
  , parser: r => r.coingecko.usd
  }

, wasabi: {
    url: 'http://wasabiukrxmkdgve5kynjztuovbg43uxcbcxn6y2okcrsg7gb6jdmbad.onion/api/v3/btc/Offchain/exchange-rates'
  , parser: r => r.body[0].rate
  }
}

if (!process.env.NO_RATES) {
  const rateProvider = rateProviders[process.env.RATE_PROVIDER || 'coingecko']
  if (!rateProvider) throw new Error('Invalid rate provider')

  exports.fetchRate = _ =>
    request.get(rateProvider.url)
      .type('json')
      .proxy()
      .then(rateProvider.parser)
}
