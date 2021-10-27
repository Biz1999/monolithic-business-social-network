import Redis from "ioredis";

function redisCleanCache(pattern: string) {
  const redis = new Redis();
  const stream = redis.scanStream({
    match: `${pattern}:*`,
  });

  stream.on("data", function (keys) {
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
