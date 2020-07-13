# Spark regtest environment

Setup a regtest dev environment with multiple wallets (requires `beyondcoind`, `lightningd` and [`jq`](https://stedolan.github.io/jq/download/)):

```bash
$ mkdir -p /tmp/spark-env/{btc,ln1,ln2}

$ beyondcoind --regtest --datadir=/tmp/spark-env/bynd --printtoconsole
$ lightningd --network regtest --lightning-dir /tmp/spark-env/ln1 --bitcoin-datadir /tmp/spark-env/bynd --addr 127.0.0.1:9600
$ lightningd --network regtest --lightning-dir /tmp/spark-env/ln2 --bitcoin-datadir /tmp/spark-env/bynd --addr 127.0.0.1:9601

$ alias bynd='beyondcoin-cli --regtest --datadir=/tmp/spark-env/bynd' \
        ln1='lightning-cli --lightning-dir /tmp/spark-env/ln1' \
        ln2='lightning-cli --lightning-dir /tmp/spark-env/ln2'

$ bynd generate 101 && bynd sendtoaddress $(ln1 newaddr | jq -r .address) 5 && bynd generate 1

# wait for onchain funds to show up on `ln1 listfunds` (updated every 30s)

$ ln1 connect $(ln2 getinfo | jq -r .id) 127.0.0.1 9601 && \
  ln1 fundchannel $(ln2 getinfo | jq -r .id) 16777215 1100perkb && bynd generate 1

# run in Spark's repo directory:
$ npm start -- --ln-path /tmp/spark-env/ln1 --port 9700 --login dev:123
$ npm start -- --ln-path /tmp/spark-env/ln2 --port 9701 --login dev:123
```
