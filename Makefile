SHELL=/bin/bash

all:
	npm ci

clean:
	@rm -rf ./node_modules

jshint:
	@./node_modules/.bin/jshint lib/ test/

TEST_SUITE := $(shell find test/{acceptance,integration,unit} -name "*.js")
TEST_SUITE_UNIT := $(shell find test/unit -name "*.js")

MOCHA_TIMEOUT := 5000

test:
	./node_modules/.bin/mocha -u bdd -t $(MOCHA_TIMEOUT) test/setup.js $(TEST_SUITE) ${MOCHA_ARGS}

test-unit:
	./node_modules/.bin/mocha -u bdd -t $(MOCHA_TIMEOUT) $(TEST_SUITE_UNIT) ${MOCHA_ARGS}

test-performance:
	./node_modules/.bin/mocha -u bdd -t $(MOCHA_TIMEOUT) test/setup.js test/acceptance/performance.js ${MOCHA_ARGS}

test-all: test jshint

coverage:
	./node_modules/.bin/istanbul cover node_modules/.bin/_mocha -- -u bdd -t $(MOCHA_TIMEOUT) test/setup.js $(TEST_SUITE) ${MOCHA_ARGS}

.PHONY: test coverage
