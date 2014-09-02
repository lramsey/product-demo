REPORTER = nyan
TIMEOUT = 240000
test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	--timeout $(TIMEOUT) \

.PHONY: test