import { div, form, button, textarea, a, span, p, strong, h2 } from '@cycle/dom'
import { formGroup, yaml } from './util'

const scanReq = ({ conf: { camIdx } }) => div('.text-center.text-md-left', [
  div('.d-flex.justify-content-between.align-items-center', [
    a('.btn.btn-lg.btn-primary.mb-3', { attrs: { href: '#/payreq' } }, 'Paste request')
  , button('.toggle-cam.btn.btn-lg.btn-info.mb-3', 'Switch cam')
  //, a('.btn.btn-secondary.mb-3', { attrs: { href: '#/' } }, 'Cancel')
  ])
, div('.scanqr', { dataset: { camIdx: ''+camIdx } })
])

const pasteReq = form({ attrs: { do: 'decode-pay' } }, [
  formGroup('Payment request'
  , textarea('.form-control.form-control-lg', { attrs: { name: 'bolt11', required: true } }))
, button('.btn.btn-lg.btn-primary', { attrs: { type: 'submit' } }, 'Decode request')
, ' '
, a('.btn.btn-lg.btn-secondary', { attrs: { href: '#/' } }, 'Cancel')
])

// @TODO show expiry
// @TODO input amount for 'any' invoice
const confirmPay = payreq => ({ unitf, conf: { expert } }) => div([
  h2('Confirm payment')
, p([ 'Do you want to pay ', strong(unitf(payreq.msatoshi)), '?'])
, payreq.description ? p([ 'Description: ', span('.text-muted', payreq.description) ]) : ''
, button('.btn.btn-lg.btn-primary', { attrs: { do: 'confirm-pay' }, dataset: payreq }, `Pay ${unitf(payreq.msatoshi)}`)
, ' '
, a('.btn.btn-lg.btn-secondary', { attrs: { href: '#/' } }, 'Cancel')
, expert ? yaml(payreq) : ''
])

module.exports = { scanReq, pasteReq, confirmPay }
