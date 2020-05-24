# Sample code for 345Tool.com blog
# @license MIT
# License: https://github.com/345Tool/blog-examples/LICENSE
FROM ubuntu:18.04

COPY . server/

RUN apt-get update && apt-get install -y sudo; \
    sudo apt-get update && sudo apt-get -y install curl unzip; \
    curl -fsSL https://deno.land/x/install/install.sh | sh;

WORKDIR server/

EXPOSE 4040

ENV DENO_INSTALL="/root/.deno"

ENV PATH="$DENO_INSTALL/bin:$PATH"

CMD deno run --allow-net --allow-read index.ts