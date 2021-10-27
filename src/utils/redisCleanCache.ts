import Redis from "ioredis";

function redisCleanCache(pattern: string) {
  const redis = new Redis();
  const stream = redis.scanStream({
    match: `${pattern}:*`,
  });

  stream.on("data", function (keys) {
    // `keys` is an array of strings representing key names
    if (keys.length) {
      var pipeline = redis.pipeline();
      keys.forEach(function (key) {
        pipeline.del(key);
      });
      pipeline.exec();
    }
  });
}

export { redisCleanCache };
