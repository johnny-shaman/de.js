var config = module.exports;

config["My tests"] = {
    env: "browser",        // or "node"
    sources: [
        "./de.js", // Paths are relative to config file
    ],
    tests: [
        "test/*-test.js"
    ]
};
