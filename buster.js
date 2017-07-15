var config = module.exports;

config["My tests"] = {
    env: "browser",        // or "node"
    sources: [
        "lib/mylib.js", // Paths are relative to config file
        "src/**/*.js"   // Glob patterns supported
    ],
    tests: [
        "test/*-test.js"
    ]
}
