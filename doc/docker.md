## Setting up Spark with Docker

You can use Docker To setup Spark, a beyondcoind node and a c-lightning node all in go with the following command:

```bash
$ docker run -it -v ~/.spark-docker:/data -p 9737:9737 \
             beyondcoin-project/beyondcoin-spark --login bob:superSecretPass456
```

You will then be able to access the Spark wallet at `https://localhost:9737`.

Runs in `testnet` mode by default, set `NETWORK` to override (e.g. `-e NETWORK=beyondcoin`).

Data files will be stored in `~/.spark-docker/{beyondcoin,lightning,spark}`.
You can set Spark's configuration options in `~/.spark-docker/spark/config`.

When starting for the first time, you'll have to wait for the bitcoin node to sync up.
You can check the progress by tailing `~/.spark-docker/beyondcoin/debug.log`.

You can set custom command line options for `beyondcoind` with `BITCOIND_OPT`
and for `lightningd` with `LIGHTNINGD_OPT`.

Note that TLS will be enabled by default (even without changing `--host`).
You can use `--no-tls` to turn it off.

#### With existing `lightningd`

To connect to an existing `lightningd` instance running on the same machine,
mount the lightning data directory to `/etc/lightning`:

```bash
$ docker run -it -v ~/.spark-docker:/data -p 9737:9737 \
             -v ~/.lightning:/etc/lightning \
             shesek/spark-wallet:standalone
```

Note the `:standalone` version for the docker image, which doesn't include
beyondcoind's/lightningd's binaries and weights about 60MB less.

Connecting to remote lightningd instances is currently not supported.

#### With existing `beyondcoind`, but with bundled `lightningd`

To connect to an existing `beyondcoind` instance running on the same machine,
mount the beyondcoin data directory to `/etc/beyondcoin` (e.g. `-v ~/.beyondcoin:/etc/beyondcoin`),
and either use host networking (`--network host`) or specify the IP where beyondcoind is reachable via `BITCOIND_RPCCONNECT`.
The RPC credentials and port will be read from beyondcoind's config file.

To connect to a remote beyondcoind instance, set `BITCOIND_URI=http://[user]:[pass]@[host]:[port]`
(or use `__cookie__:...` as the login for cookie-based authentication).
