/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.PARAM_SAMPLE = (function() {

    /**
     * Properties of a PARAM_SAMPLE.
     * @exports IPARAM_SAMPLE
     * @interface IPARAM_SAMPLE
     * @property {IGmt|null} [objGmt] PARAM_SAMPLE objGmt
     * @property {IValue|null} [objValue] PARAM_SAMPLE objValue
     * @property {IStatus|null} [objStatus] PARAM_SAMPLE objStatus
     */

    /**
     * Constructs a new PARAM_SAMPLE.
     * @exports PARAM_SAMPLE
     * @classdesc Represents a PARAM_SAMPLE.
     * @implements IPARAM_SAMPLE
     * @constructor
     * @param {IPARAM_SAMPLE=} [properties] Properties to set
     */
    function PARAM_SAMPLE(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PARAM_SAMPLE objGmt.
     * @member {IGmt|null|undefined} objGmt
     * @memberof PARAM_SAMPLE
     * @instance
     */
    PARAM_SAMPLE.prototype.objGmt = null;

    /**
     * PARAM_SAMPLE objValue.
     * @member {IValue|null|undefined} objValue
     * @memberof PARAM_SAMPLE
     * @instance
     */
    PARAM_SAMPLE.prototype.objValue = null;

    /**
     * PARAM_SAMPLE objStatus.
     * @member {IStatus|null|undefined} objStatus
     * @memberof PARAM_SAMPLE
     * @instance
     */
    PARAM_SAMPLE.prototype.objStatus = null;

    /**
     * Creates a new PARAM_SAMPLE instance using the specified properties.
     * @function create
     * @memberof PARAM_SAMPLE
     * @static
     * @param {IPARAM_SAMPLE=} [properties] Properties to set
     * @returns {PARAM_SAMPLE} PARAM_SAMPLE instance
     */
    PARAM_SAMPLE.create = function create(properties) {
        return new PARAM_SAMPLE(properties);
    };

    /**
     * Encodes the specified PARAM_SAMPLE message. Does not implicitly {@link PARAM_SAMPLE.verify|verify} messages.
     * @function encode
     * @memberof PARAM_SAMPLE
     * @static
     * @param {IPARAM_SAMPLE} message PARAM_SAMPLE message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLE.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.objGmt != null && message.hasOwnProperty("objGmt"))
            $root.Gmt.encode(message.objGmt, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.objValue != null && message.hasOwnProperty("objValue"))
            $root.Value.encode(message.objValue, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.objStatus != null && message.hasOwnProperty("objStatus"))
            $root.Status.encode(message.objStatus, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PARAM_SAMPLE message, length delimited. Does not implicitly {@link PARAM_SAMPLE.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PARAM_SAMPLE
     * @static
     * @param {IPARAM_SAMPLE} message PARAM_SAMPLE message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLE.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PARAM_SAMPLE message from the specified reader or buffer.
     * @function decode
     * @memberof PARAM_SAMPLE
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PARAM_SAMPLE} PARAM_SAMPLE
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLE.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PARAM_SAMPLE();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.objGmt = $root.Gmt.decode(reader, reader.uint32());
                break;
            case 2:
                message.objValue = $root.Value.decode(reader, reader.uint32());
                break;
            case 3:
                message.objStatus = $root.Status.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PARAM_SAMPLE message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PARAM_SAMPLE
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PARAM_SAMPLE} PARAM_SAMPLE
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLE.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PARAM_SAMPLE message.
     * @function verify
     * @memberof PARAM_SAMPLE
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PARAM_SAMPLE.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.objGmt != null && message.hasOwnProperty("objGmt")) {
            var error = $root.Gmt.verify(message.objGmt);
            if (error)
                return "objGmt." + error;
        }
        if (message.objValue != null && message.hasOwnProperty("objValue")) {
            var error = $root.Value.verify(message.objValue);
            if (error)
                return "objValue." + error;
        }
        if (message.objStatus != null && message.hasOwnProperty("objStatus")) {
            var error = $root.Status.verify(message.objStatus);
            if (error)
                return "objStatus." + error;
        }
        return null;
    };

    /**
     * Creates a PARAM_SAMPLE message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PARAM_SAMPLE
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PARAM_SAMPLE} PARAM_SAMPLE
     */
    PARAM_SAMPLE.fromObject = function fromObject(object) {
        if (object instanceof $root.PARAM_SAMPLE)
            return object;
        var message = new $root.PARAM_SAMPLE();
        if (object.objGmt != null) {
            if (typeof object.objGmt !== "object")
                throw TypeError(".PARAM_SAMPLE.objGmt: object expected");
            message.objGmt = $root.Gmt.fromObject(object.objGmt);
        }
        if (object.objValue != null) {
            if (typeof object.objValue !== "object")
                throw TypeError(".PARAM_SAMPLE.objValue: object expected");
            message.objValue = $root.Value.fromObject(object.objValue);
        }
        if (object.objStatus != null) {
            if (typeof object.objStatus !== "object")
                throw TypeError(".PARAM_SAMPLE.objStatus: object expected");
            message.objStatus = $root.Status.fromObject(object.objStatus);
        }
        return message;
    };

    /**
     * Creates a plain object from a PARAM_SAMPLE message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PARAM_SAMPLE
     * @static
     * @param {PARAM_SAMPLE} message PARAM_SAMPLE
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PARAM_SAMPLE.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.objGmt = null;
            object.objValue = null;
            object.objStatus = null;
        }
        if (message.objGmt != null && message.hasOwnProperty("objGmt"))
            object.objGmt = $root.Gmt.toObject(message.objGmt, options);
        if (message.objValue != null && message.hasOwnProperty("objValue"))
            object.objValue = $root.Value.toObject(message.objValue, options);
        if (message.objStatus != null && message.hasOwnProperty("objStatus"))
            object.objStatus = $root.Status.toObject(message.objStatus, options);
        return object;
    };

    /**
     * Converts this PARAM_SAMPLE to JSON.
     * @function toJSON
     * @memberof PARAM_SAMPLE
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PARAM_SAMPLE.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PARAM_SAMPLE;
})();

$root.PARAM_SAMPLES = (function() {

    /**
     * Properties of a PARAM_SAMPLES.
     * @exports IPARAM_SAMPLES
     * @interface IPARAM_SAMPLES
     * @property {Array.<IPARAM_SAMPLE>|null} [listParamSample] PARAM_SAMPLES listParamSample
     */

    /**
     * Constructs a new PARAM_SAMPLES.
     * @exports PARAM_SAMPLES
     * @classdesc Represents a PARAM_SAMPLES.
     * @implements IPARAM_SAMPLES
     * @constructor
     * @param {IPARAM_SAMPLES=} [properties] Properties to set
     */
    function PARAM_SAMPLES(properties) {
        this.listParamSample = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PARAM_SAMPLES listParamSample.
     * @member {Array.<IPARAM_SAMPLE>} listParamSample
     * @memberof PARAM_SAMPLES
     * @instance
     */
    PARAM_SAMPLES.prototype.listParamSample = $util.emptyArray;

    /**
     * Creates a new PARAM_SAMPLES instance using the specified properties.
     * @function create
     * @memberof PARAM_SAMPLES
     * @static
     * @param {IPARAM_SAMPLES=} [properties] Properties to set
     * @returns {PARAM_SAMPLES} PARAM_SAMPLES instance
     */
    PARAM_SAMPLES.create = function create(properties) {
        return new PARAM_SAMPLES(properties);
    };

    /**
     * Encodes the specified PARAM_SAMPLES message. Does not implicitly {@link PARAM_SAMPLES.verify|verify} messages.
     * @function encode
     * @memberof PARAM_SAMPLES
     * @static
     * @param {IPARAM_SAMPLES} message PARAM_SAMPLES message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listParamSample != null && message.listParamSample.length)
            for (var i = 0; i < message.listParamSample.length; ++i)
                $root.PARAM_SAMPLE.encode(message.listParamSample[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PARAM_SAMPLES message, length delimited. Does not implicitly {@link PARAM_SAMPLES.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PARAM_SAMPLES
     * @static
     * @param {IPARAM_SAMPLES} message PARAM_SAMPLES message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PARAM_SAMPLES message from the specified reader or buffer.
     * @function decode
     * @memberof PARAM_SAMPLES
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PARAM_SAMPLES} PARAM_SAMPLES
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PARAM_SAMPLES();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listParamSample && message.listParamSample.length))
                    message.listParamSample = [];
                message.listParamSample.push($root.PARAM_SAMPLE.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PARAM_SAMPLES message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PARAM_SAMPLES
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PARAM_SAMPLES} PARAM_SAMPLES
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PARAM_SAMPLES message.
     * @function verify
     * @memberof PARAM_SAMPLES
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PARAM_SAMPLES.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listParamSample != null && message.hasOwnProperty("listParamSample")) {
            if (!Array.isArray(message.listParamSample))
                return "listParamSample: array expected";
            for (var i = 0; i < message.listParamSample.length; ++i) {
                var error = $root.PARAM_SAMPLE.verify(message.listParamSample[i]);
                if (error)
                    return "listParamSample." + error;
            }
        }
        return null;
    };

    /**
     * Creates a PARAM_SAMPLES message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PARAM_SAMPLES
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PARAM_SAMPLES} PARAM_SAMPLES
     */
    PARAM_SAMPLES.fromObject = function fromObject(object) {
        if (object instanceof $root.PARAM_SAMPLES)
            return object;
        var message = new $root.PARAM_SAMPLES();
        if (object.listParamSample) {
            if (!Array.isArray(object.listParamSample))
                throw TypeError(".PARAM_SAMPLES.listParamSample: array expected");
            message.listParamSample = [];
            for (var i = 0; i < object.listParamSample.length; ++i) {
                if (typeof object.listParamSample[i] !== "object")
                    throw TypeError(".PARAM_SAMPLES.listParamSample: object expected");
                message.listParamSample[i] = $root.PARAM_SAMPLE.fromObject(object.listParamSample[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a PARAM_SAMPLES message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PARAM_SAMPLES
     * @static
     * @param {PARAM_SAMPLES} message PARAM_SAMPLES
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PARAM_SAMPLES.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listParamSample = [];
        if (message.listParamSample && message.listParamSample.length) {
            object.listParamSample = [];
            for (var j = 0; j < message.listParamSample.length; ++j)
                object.listParamSample[j] = $root.PARAM_SAMPLE.toObject(message.listParamSample[j], options);
        }
        return object;
    };

    /**
     * Converts this PARAM_SAMPLES to JSON.
     * @function toJSON
     * @memberof PARAM_SAMPLES
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PARAM_SAMPLES.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PARAM_SAMPLES;
})();

$root.MULTI_PARAM_SAMPLES = (function() {

    /**
     * Properties of a MULTI_PARAM_SAMPLES.
     * @exports IMULTI_PARAM_SAMPLES
     * @interface IMULTI_PARAM_SAMPLES
     * @property {Array.<IPARAM_SAMPLES>|null} [listParamSamples] MULTI_PARAM_SAMPLES listParamSamples
     */

    /**
     * Constructs a new MULTI_PARAM_SAMPLES.
     * @exports MULTI_PARAM_SAMPLES
     * @classdesc Represents a MULTI_PARAM_SAMPLES.
     * @implements IMULTI_PARAM_SAMPLES
     * @constructor
     * @param {IMULTI_PARAM_SAMPLES=} [properties] Properties to set
     */
    function MULTI_PARAM_SAMPLES(properties) {
        this.listParamSamples = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MULTI_PARAM_SAMPLES listParamSamples.
     * @member {Array.<IPARAM_SAMPLES>} listParamSamples
     * @memberof MULTI_PARAM_SAMPLES
     * @instance
     */
    MULTI_PARAM_SAMPLES.prototype.listParamSamples = $util.emptyArray;

    /**
     * Creates a new MULTI_PARAM_SAMPLES instance using the specified properties.
     * @function create
     * @memberof MULTI_PARAM_SAMPLES
     * @static
     * @param {IMULTI_PARAM_SAMPLES=} [properties] Properties to set
     * @returns {MULTI_PARAM_SAMPLES} MULTI_PARAM_SAMPLES instance
     */
    MULTI_PARAM_SAMPLES.create = function create(properties) {
        return new MULTI_PARAM_SAMPLES(properties);
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES message. Does not implicitly {@link MULTI_PARAM_SAMPLES.verify|verify} messages.
     * @function encode
     * @memberof MULTI_PARAM_SAMPLES
     * @static
     * @param {IMULTI_PARAM_SAMPLES} message MULTI_PARAM_SAMPLES message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listParamSamples != null && message.listParamSamples.length)
            for (var i = 0; i < message.listParamSamples.length; ++i)
                $root.PARAM_SAMPLES.encode(message.listParamSamples[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES message, length delimited. Does not implicitly {@link MULTI_PARAM_SAMPLES.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MULTI_PARAM_SAMPLES
     * @static
     * @param {IMULTI_PARAM_SAMPLES} message MULTI_PARAM_SAMPLES message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES message from the specified reader or buffer.
     * @function decode
     * @memberof MULTI_PARAM_SAMPLES
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MULTI_PARAM_SAMPLES} MULTI_PARAM_SAMPLES
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MULTI_PARAM_SAMPLES();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listParamSamples && message.listParamSamples.length))
                    message.listParamSamples = [];
                message.listParamSamples.push($root.PARAM_SAMPLES.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MULTI_PARAM_SAMPLES
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MULTI_PARAM_SAMPLES} MULTI_PARAM_SAMPLES
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MULTI_PARAM_SAMPLES message.
     * @function verify
     * @memberof MULTI_PARAM_SAMPLES
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MULTI_PARAM_SAMPLES.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listParamSamples != null && message.hasOwnProperty("listParamSamples")) {
            if (!Array.isArray(message.listParamSamples))
                return "listParamSamples: array expected";
            for (var i = 0; i < message.listParamSamples.length; ++i) {
                var error = $root.PARAM_SAMPLES.verify(message.listParamSamples[i]);
                if (error)
                    return "listParamSamples." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MULTI_PARAM_SAMPLES message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MULTI_PARAM_SAMPLES
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MULTI_PARAM_SAMPLES} MULTI_PARAM_SAMPLES
     */
    MULTI_PARAM_SAMPLES.fromObject = function fromObject(object) {
        if (object instanceof $root.MULTI_PARAM_SAMPLES)
            return object;
        var message = new $root.MULTI_PARAM_SAMPLES();
        if (object.listParamSamples) {
            if (!Array.isArray(object.listParamSamples))
                throw TypeError(".MULTI_PARAM_SAMPLES.listParamSamples: array expected");
            message.listParamSamples = [];
            for (var i = 0; i < object.listParamSamples.length; ++i) {
                if (typeof object.listParamSamples[i] !== "object")
                    throw TypeError(".MULTI_PARAM_SAMPLES.listParamSamples: object expected");
                message.listParamSamples[i] = $root.PARAM_SAMPLES.fromObject(object.listParamSamples[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MULTI_PARAM_SAMPLES message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MULTI_PARAM_SAMPLES
     * @static
     * @param {MULTI_PARAM_SAMPLES} message MULTI_PARAM_SAMPLES
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MULTI_PARAM_SAMPLES.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listParamSamples = [];
        if (message.listParamSamples && message.listParamSamples.length) {
            object.listParamSamples = [];
            for (var j = 0; j < message.listParamSamples.length; ++j)
                object.listParamSamples[j] = $root.PARAM_SAMPLES.toObject(message.listParamSamples[j], options);
        }
        return object;
    };

    /**
     * Converts this MULTI_PARAM_SAMPLES to JSON.
     * @function toJSON
     * @memberof MULTI_PARAM_SAMPLES
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MULTI_PARAM_SAMPLES.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MULTI_PARAM_SAMPLES;
})();

$root.PARAM_SAMPLES_PERGMT = (function() {

    /**
     * Properties of a PARAM_SAMPLES_PERGMT.
     * @exports IPARAM_SAMPLES_PERGMT
     * @interface IPARAM_SAMPLES_PERGMT
     * @property {IGmt|null} [objGmt] PARAM_SAMPLES_PERGMT objGmt
     * @property {IValList|null} [listValueStatusPairs] PARAM_SAMPLES_PERGMT listValueStatusPairs
     */

    /**
     * Constructs a new PARAM_SAMPLES_PERGMT.
     * @exports PARAM_SAMPLES_PERGMT
     * @classdesc Represents a PARAM_SAMPLES_PERGMT.
     * @implements IPARAM_SAMPLES_PERGMT
     * @constructor
     * @param {IPARAM_SAMPLES_PERGMT=} [properties] Properties to set
     */
    function PARAM_SAMPLES_PERGMT(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PARAM_SAMPLES_PERGMT objGmt.
     * @member {IGmt|null|undefined} objGmt
     * @memberof PARAM_SAMPLES_PERGMT
     * @instance
     */
    PARAM_SAMPLES_PERGMT.prototype.objGmt = null;

    /**
     * PARAM_SAMPLES_PERGMT listValueStatusPairs.
     * @member {IValList|null|undefined} listValueStatusPairs
     * @memberof PARAM_SAMPLES_PERGMT
     * @instance
     */
    PARAM_SAMPLES_PERGMT.prototype.listValueStatusPairs = null;

    /**
     * Creates a new PARAM_SAMPLES_PERGMT instance using the specified properties.
     * @function create
     * @memberof PARAM_SAMPLES_PERGMT
     * @static
     * @param {IPARAM_SAMPLES_PERGMT=} [properties] Properties to set
     * @returns {PARAM_SAMPLES_PERGMT} PARAM_SAMPLES_PERGMT instance
     */
    PARAM_SAMPLES_PERGMT.create = function create(properties) {
        return new PARAM_SAMPLES_PERGMT(properties);
    };

    /**
     * Encodes the specified PARAM_SAMPLES_PERGMT message. Does not implicitly {@link PARAM_SAMPLES_PERGMT.verify|verify} messages.
     * @function encode
     * @memberof PARAM_SAMPLES_PERGMT
     * @static
     * @param {IPARAM_SAMPLES_PERGMT} message PARAM_SAMPLES_PERGMT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES_PERGMT.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.objGmt != null && message.hasOwnProperty("objGmt"))
            $root.Gmt.encode(message.objGmt, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.listValueStatusPairs != null && message.hasOwnProperty("listValueStatusPairs"))
            $root.ValList.encode(message.listValueStatusPairs, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PARAM_SAMPLES_PERGMT message, length delimited. Does not implicitly {@link PARAM_SAMPLES_PERGMT.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PARAM_SAMPLES_PERGMT
     * @static
     * @param {IPARAM_SAMPLES_PERGMT} message PARAM_SAMPLES_PERGMT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES_PERGMT.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PARAM_SAMPLES_PERGMT message from the specified reader or buffer.
     * @function decode
     * @memberof PARAM_SAMPLES_PERGMT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PARAM_SAMPLES_PERGMT} PARAM_SAMPLES_PERGMT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES_PERGMT.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PARAM_SAMPLES_PERGMT();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.objGmt = $root.Gmt.decode(reader, reader.uint32());
                break;
            case 2:
                message.listValueStatusPairs = $root.ValList.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PARAM_SAMPLES_PERGMT message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PARAM_SAMPLES_PERGMT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PARAM_SAMPLES_PERGMT} PARAM_SAMPLES_PERGMT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES_PERGMT.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PARAM_SAMPLES_PERGMT message.
     * @function verify
     * @memberof PARAM_SAMPLES_PERGMT
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PARAM_SAMPLES_PERGMT.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.objGmt != null && message.hasOwnProperty("objGmt")) {
            var error = $root.Gmt.verify(message.objGmt);
            if (error)
                return "objGmt." + error;
        }
        if (message.listValueStatusPairs != null && message.hasOwnProperty("listValueStatusPairs")) {
            var error = $root.ValList.verify(message.listValueStatusPairs);
            if (error)
                return "listValueStatusPairs." + error;
        }
        return null;
    };

    /**
     * Creates a PARAM_SAMPLES_PERGMT message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PARAM_SAMPLES_PERGMT
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PARAM_SAMPLES_PERGMT} PARAM_SAMPLES_PERGMT
     */
    PARAM_SAMPLES_PERGMT.fromObject = function fromObject(object) {
        if (object instanceof $root.PARAM_SAMPLES_PERGMT)
            return object;
        var message = new $root.PARAM_SAMPLES_PERGMT();
        if (object.objGmt != null) {
            if (typeof object.objGmt !== "object")
                throw TypeError(".PARAM_SAMPLES_PERGMT.objGmt: object expected");
            message.objGmt = $root.Gmt.fromObject(object.objGmt);
        }
        if (object.listValueStatusPairs != null) {
            if (typeof object.listValueStatusPairs !== "object")
                throw TypeError(".PARAM_SAMPLES_PERGMT.listValueStatusPairs: object expected");
            message.listValueStatusPairs = $root.ValList.fromObject(object.listValueStatusPairs);
        }
        return message;
    };

    /**
     * Creates a plain object from a PARAM_SAMPLES_PERGMT message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PARAM_SAMPLES_PERGMT
     * @static
     * @param {PARAM_SAMPLES_PERGMT} message PARAM_SAMPLES_PERGMT
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PARAM_SAMPLES_PERGMT.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.objGmt = null;
            object.listValueStatusPairs = null;
        }
        if (message.objGmt != null && message.hasOwnProperty("objGmt"))
            object.objGmt = $root.Gmt.toObject(message.objGmt, options);
        if (message.listValueStatusPairs != null && message.hasOwnProperty("listValueStatusPairs"))
            object.listValueStatusPairs = $root.ValList.toObject(message.listValueStatusPairs, options);
        return object;
    };

    /**
     * Converts this PARAM_SAMPLES_PERGMT to JSON.
     * @function toJSON
     * @memberof PARAM_SAMPLES_PERGMT
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PARAM_SAMPLES_PERGMT.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PARAM_SAMPLES_PERGMT;
})();

$root.MULTI_PARAM_SAMPLES_PERGMT = (function() {

    /**
     * Properties of a MULTI_PARAM_SAMPLES_PERGMT.
     * @exports IMULTI_PARAM_SAMPLES_PERGMT
     * @interface IMULTI_PARAM_SAMPLES_PERGMT
     * @property {Array.<IPARAM_SAMPLES_PERGMT>|null} [listParamSamplesPerGmt] MULTI_PARAM_SAMPLES_PERGMT listParamSamplesPerGmt
     */

    /**
     * Constructs a new MULTI_PARAM_SAMPLES_PERGMT.
     * @exports MULTI_PARAM_SAMPLES_PERGMT
     * @classdesc Represents a MULTI_PARAM_SAMPLES_PERGMT.
     * @implements IMULTI_PARAM_SAMPLES_PERGMT
     * @constructor
     * @param {IMULTI_PARAM_SAMPLES_PERGMT=} [properties] Properties to set
     */
    function MULTI_PARAM_SAMPLES_PERGMT(properties) {
        this.listParamSamplesPerGmt = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MULTI_PARAM_SAMPLES_PERGMT listParamSamplesPerGmt.
     * @member {Array.<IPARAM_SAMPLES_PERGMT>} listParamSamplesPerGmt
     * @memberof MULTI_PARAM_SAMPLES_PERGMT
     * @instance
     */
    MULTI_PARAM_SAMPLES_PERGMT.prototype.listParamSamplesPerGmt = $util.emptyArray;

    /**
     * Creates a new MULTI_PARAM_SAMPLES_PERGMT instance using the specified properties.
     * @function create
     * @memberof MULTI_PARAM_SAMPLES_PERGMT
     * @static
     * @param {IMULTI_PARAM_SAMPLES_PERGMT=} [properties] Properties to set
     * @returns {MULTI_PARAM_SAMPLES_PERGMT} MULTI_PARAM_SAMPLES_PERGMT instance
     */
    MULTI_PARAM_SAMPLES_PERGMT.create = function create(properties) {
        return new MULTI_PARAM_SAMPLES_PERGMT(properties);
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_PERGMT message. Does not implicitly {@link MULTI_PARAM_SAMPLES_PERGMT.verify|verify} messages.
     * @function encode
     * @memberof MULTI_PARAM_SAMPLES_PERGMT
     * @static
     * @param {IMULTI_PARAM_SAMPLES_PERGMT} message MULTI_PARAM_SAMPLES_PERGMT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_PERGMT.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listParamSamplesPerGmt != null && message.listParamSamplesPerGmt.length)
            for (var i = 0; i < message.listParamSamplesPerGmt.length; ++i)
                $root.PARAM_SAMPLES_PERGMT.encode(message.listParamSamplesPerGmt[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_PERGMT message, length delimited. Does not implicitly {@link MULTI_PARAM_SAMPLES_PERGMT.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_PERGMT
     * @static
     * @param {IMULTI_PARAM_SAMPLES_PERGMT} message MULTI_PARAM_SAMPLES_PERGMT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_PERGMT.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_PERGMT message from the specified reader or buffer.
     * @function decode
     * @memberof MULTI_PARAM_SAMPLES_PERGMT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MULTI_PARAM_SAMPLES_PERGMT} MULTI_PARAM_SAMPLES_PERGMT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_PERGMT.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MULTI_PARAM_SAMPLES_PERGMT();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listParamSamplesPerGmt && message.listParamSamplesPerGmt.length))
                    message.listParamSamplesPerGmt = [];
                message.listParamSamplesPerGmt.push($root.PARAM_SAMPLES_PERGMT.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_PERGMT message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_PERGMT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MULTI_PARAM_SAMPLES_PERGMT} MULTI_PARAM_SAMPLES_PERGMT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_PERGMT.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MULTI_PARAM_SAMPLES_PERGMT message.
     * @function verify
     * @memberof MULTI_PARAM_SAMPLES_PERGMT
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MULTI_PARAM_SAMPLES_PERGMT.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listParamSamplesPerGmt != null && message.hasOwnProperty("listParamSamplesPerGmt")) {
            if (!Array.isArray(message.listParamSamplesPerGmt))
                return "listParamSamplesPerGmt: array expected";
            for (var i = 0; i < message.listParamSamplesPerGmt.length; ++i) {
                var error = $root.PARAM_SAMPLES_PERGMT.verify(message.listParamSamplesPerGmt[i]);
                if (error)
                    return "listParamSamplesPerGmt." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MULTI_PARAM_SAMPLES_PERGMT message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MULTI_PARAM_SAMPLES_PERGMT
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MULTI_PARAM_SAMPLES_PERGMT} MULTI_PARAM_SAMPLES_PERGMT
     */
    MULTI_PARAM_SAMPLES_PERGMT.fromObject = function fromObject(object) {
        if (object instanceof $root.MULTI_PARAM_SAMPLES_PERGMT)
            return object;
        var message = new $root.MULTI_PARAM_SAMPLES_PERGMT();
        if (object.listParamSamplesPerGmt) {
            if (!Array.isArray(object.listParamSamplesPerGmt))
                throw TypeError(".MULTI_PARAM_SAMPLES_PERGMT.listParamSamplesPerGmt: array expected");
            message.listParamSamplesPerGmt = [];
            for (var i = 0; i < object.listParamSamplesPerGmt.length; ++i) {
                if (typeof object.listParamSamplesPerGmt[i] !== "object")
                    throw TypeError(".MULTI_PARAM_SAMPLES_PERGMT.listParamSamplesPerGmt: object expected");
                message.listParamSamplesPerGmt[i] = $root.PARAM_SAMPLES_PERGMT.fromObject(object.listParamSamplesPerGmt[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MULTI_PARAM_SAMPLES_PERGMT message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MULTI_PARAM_SAMPLES_PERGMT
     * @static
     * @param {MULTI_PARAM_SAMPLES_PERGMT} message MULTI_PARAM_SAMPLES_PERGMT
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MULTI_PARAM_SAMPLES_PERGMT.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listParamSamplesPerGmt = [];
        if (message.listParamSamplesPerGmt && message.listParamSamplesPerGmt.length) {
            object.listParamSamplesPerGmt = [];
            for (var j = 0; j < message.listParamSamplesPerGmt.length; ++j)
                object.listParamSamplesPerGmt[j] = $root.PARAM_SAMPLES_PERGMT.toObject(message.listParamSamplesPerGmt[j], options);
        }
        return object;
    };

    /**
     * Converts this MULTI_PARAM_SAMPLES_PERGMT to JSON.
     * @function toJSON
     * @memberof MULTI_PARAM_SAMPLES_PERGMT
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MULTI_PARAM_SAMPLES_PERGMT.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MULTI_PARAM_SAMPLES_PERGMT;
})();

$root.PARAM_SAMPLES_PERGMT_DATE = (function() {

    /**
     * Properties of a PARAM_SAMPLES_PERGMT_DATE.
     * @exports IPARAM_SAMPLES_PERGMT_DATE
     * @interface IPARAM_SAMPLES_PERGMT_DATE
     * @property {IGmt|null} [objGmt] PARAM_SAMPLES_PERGMT_DATE objGmt
     * @property {IPARAM_SAMPLES|null} [listParamSamples] PARAM_SAMPLES_PERGMT_DATE listParamSamples
     */

    /**
     * Constructs a new PARAM_SAMPLES_PERGMT_DATE.
     * @exports PARAM_SAMPLES_PERGMT_DATE
     * @classdesc Represents a PARAM_SAMPLES_PERGMT_DATE.
     * @implements IPARAM_SAMPLES_PERGMT_DATE
     * @constructor
     * @param {IPARAM_SAMPLES_PERGMT_DATE=} [properties] Properties to set
     */
    function PARAM_SAMPLES_PERGMT_DATE(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PARAM_SAMPLES_PERGMT_DATE objGmt.
     * @member {IGmt|null|undefined} objGmt
     * @memberof PARAM_SAMPLES_PERGMT_DATE
     * @instance
     */
    PARAM_SAMPLES_PERGMT_DATE.prototype.objGmt = null;

    /**
     * PARAM_SAMPLES_PERGMT_DATE listParamSamples.
     * @member {IPARAM_SAMPLES|null|undefined} listParamSamples
     * @memberof PARAM_SAMPLES_PERGMT_DATE
     * @instance
     */
    PARAM_SAMPLES_PERGMT_DATE.prototype.listParamSamples = null;

    /**
     * Creates a new PARAM_SAMPLES_PERGMT_DATE instance using the specified properties.
     * @function create
     * @memberof PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {IPARAM_SAMPLES_PERGMT_DATE=} [properties] Properties to set
     * @returns {PARAM_SAMPLES_PERGMT_DATE} PARAM_SAMPLES_PERGMT_DATE instance
     */
    PARAM_SAMPLES_PERGMT_DATE.create = function create(properties) {
        return new PARAM_SAMPLES_PERGMT_DATE(properties);
    };

    /**
     * Encodes the specified PARAM_SAMPLES_PERGMT_DATE message. Does not implicitly {@link PARAM_SAMPLES_PERGMT_DATE.verify|verify} messages.
     * @function encode
     * @memberof PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {IPARAM_SAMPLES_PERGMT_DATE} message PARAM_SAMPLES_PERGMT_DATE message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES_PERGMT_DATE.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.objGmt != null && message.hasOwnProperty("objGmt"))
            $root.Gmt.encode(message.objGmt, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.listParamSamples != null && message.hasOwnProperty("listParamSamples"))
            $root.PARAM_SAMPLES.encode(message.listParamSamples, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PARAM_SAMPLES_PERGMT_DATE message, length delimited. Does not implicitly {@link PARAM_SAMPLES_PERGMT_DATE.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {IPARAM_SAMPLES_PERGMT_DATE} message PARAM_SAMPLES_PERGMT_DATE message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES_PERGMT_DATE.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PARAM_SAMPLES_PERGMT_DATE message from the specified reader or buffer.
     * @function decode
     * @memberof PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PARAM_SAMPLES_PERGMT_DATE} PARAM_SAMPLES_PERGMT_DATE
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES_PERGMT_DATE.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PARAM_SAMPLES_PERGMT_DATE();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.objGmt = $root.Gmt.decode(reader, reader.uint32());
                break;
            case 2:
                message.listParamSamples = $root.PARAM_SAMPLES.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PARAM_SAMPLES_PERGMT_DATE message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PARAM_SAMPLES_PERGMT_DATE} PARAM_SAMPLES_PERGMT_DATE
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES_PERGMT_DATE.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PARAM_SAMPLES_PERGMT_DATE message.
     * @function verify
     * @memberof PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PARAM_SAMPLES_PERGMT_DATE.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.objGmt != null && message.hasOwnProperty("objGmt")) {
            var error = $root.Gmt.verify(message.objGmt);
            if (error)
                return "objGmt." + error;
        }
        if (message.listParamSamples != null && message.hasOwnProperty("listParamSamples")) {
            var error = $root.PARAM_SAMPLES.verify(message.listParamSamples);
            if (error)
                return "listParamSamples." + error;
        }
        return null;
    };

    /**
     * Creates a PARAM_SAMPLES_PERGMT_DATE message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PARAM_SAMPLES_PERGMT_DATE} PARAM_SAMPLES_PERGMT_DATE
     */
    PARAM_SAMPLES_PERGMT_DATE.fromObject = function fromObject(object) {
        if (object instanceof $root.PARAM_SAMPLES_PERGMT_DATE)
            return object;
        var message = new $root.PARAM_SAMPLES_PERGMT_DATE();
        if (object.objGmt != null) {
            if (typeof object.objGmt !== "object")
                throw TypeError(".PARAM_SAMPLES_PERGMT_DATE.objGmt: object expected");
            message.objGmt = $root.Gmt.fromObject(object.objGmt);
        }
        if (object.listParamSamples != null) {
            if (typeof object.listParamSamples !== "object")
                throw TypeError(".PARAM_SAMPLES_PERGMT_DATE.listParamSamples: object expected");
            message.listParamSamples = $root.PARAM_SAMPLES.fromObject(object.listParamSamples);
        }
        return message;
    };

    /**
     * Creates a plain object from a PARAM_SAMPLES_PERGMT_DATE message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {PARAM_SAMPLES_PERGMT_DATE} message PARAM_SAMPLES_PERGMT_DATE
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PARAM_SAMPLES_PERGMT_DATE.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.objGmt = null;
            object.listParamSamples = null;
        }
        if (message.objGmt != null && message.hasOwnProperty("objGmt"))
            object.objGmt = $root.Gmt.toObject(message.objGmt, options);
        if (message.listParamSamples != null && message.hasOwnProperty("listParamSamples"))
            object.listParamSamples = $root.PARAM_SAMPLES.toObject(message.listParamSamples, options);
        return object;
    };

    /**
     * Converts this PARAM_SAMPLES_PERGMT_DATE to JSON.
     * @function toJSON
     * @memberof PARAM_SAMPLES_PERGMT_DATE
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PARAM_SAMPLES_PERGMT_DATE.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PARAM_SAMPLES_PERGMT_DATE;
})();

$root.MULTI_PARAM_SAMPLES_PERGMT_DATE = (function() {

    /**
     * Properties of a MULTI_PARAM_SAMPLES_PERGMT_DATE.
     * @exports IMULTI_PARAM_SAMPLES_PERGMT_DATE
     * @interface IMULTI_PARAM_SAMPLES_PERGMT_DATE
     * @property {Array.<IPARAM_SAMPLES_PERGMT_DATE>|null} [listParamSamplesPerGmtDate] MULTI_PARAM_SAMPLES_PERGMT_DATE listParamSamplesPerGmtDate
     */

    /**
     * Constructs a new MULTI_PARAM_SAMPLES_PERGMT_DATE.
     * @exports MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @classdesc Represents a MULTI_PARAM_SAMPLES_PERGMT_DATE.
     * @implements IMULTI_PARAM_SAMPLES_PERGMT_DATE
     * @constructor
     * @param {IMULTI_PARAM_SAMPLES_PERGMT_DATE=} [properties] Properties to set
     */
    function MULTI_PARAM_SAMPLES_PERGMT_DATE(properties) {
        this.listParamSamplesPerGmtDate = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MULTI_PARAM_SAMPLES_PERGMT_DATE listParamSamplesPerGmtDate.
     * @member {Array.<IPARAM_SAMPLES_PERGMT_DATE>} listParamSamplesPerGmtDate
     * @memberof MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @instance
     */
    MULTI_PARAM_SAMPLES_PERGMT_DATE.prototype.listParamSamplesPerGmtDate = $util.emptyArray;

    /**
     * Creates a new MULTI_PARAM_SAMPLES_PERGMT_DATE instance using the specified properties.
     * @function create
     * @memberof MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {IMULTI_PARAM_SAMPLES_PERGMT_DATE=} [properties] Properties to set
     * @returns {MULTI_PARAM_SAMPLES_PERGMT_DATE} MULTI_PARAM_SAMPLES_PERGMT_DATE instance
     */
    MULTI_PARAM_SAMPLES_PERGMT_DATE.create = function create(properties) {
        return new MULTI_PARAM_SAMPLES_PERGMT_DATE(properties);
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_PERGMT_DATE message. Does not implicitly {@link MULTI_PARAM_SAMPLES_PERGMT_DATE.verify|verify} messages.
     * @function encode
     * @memberof MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {IMULTI_PARAM_SAMPLES_PERGMT_DATE} message MULTI_PARAM_SAMPLES_PERGMT_DATE message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_PERGMT_DATE.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listParamSamplesPerGmtDate != null && message.listParamSamplesPerGmtDate.length)
            for (var i = 0; i < message.listParamSamplesPerGmtDate.length; ++i)
                $root.PARAM_SAMPLES_PERGMT_DATE.encode(message.listParamSamplesPerGmtDate[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_PERGMT_DATE message, length delimited. Does not implicitly {@link MULTI_PARAM_SAMPLES_PERGMT_DATE.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {IMULTI_PARAM_SAMPLES_PERGMT_DATE} message MULTI_PARAM_SAMPLES_PERGMT_DATE message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_PERGMT_DATE.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_PERGMT_DATE message from the specified reader or buffer.
     * @function decode
     * @memberof MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MULTI_PARAM_SAMPLES_PERGMT_DATE} MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_PERGMT_DATE.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MULTI_PARAM_SAMPLES_PERGMT_DATE();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listParamSamplesPerGmtDate && message.listParamSamplesPerGmtDate.length))
                    message.listParamSamplesPerGmtDate = [];
                message.listParamSamplesPerGmtDate.push($root.PARAM_SAMPLES_PERGMT_DATE.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_PERGMT_DATE message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MULTI_PARAM_SAMPLES_PERGMT_DATE} MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_PERGMT_DATE.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MULTI_PARAM_SAMPLES_PERGMT_DATE message.
     * @function verify
     * @memberof MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MULTI_PARAM_SAMPLES_PERGMT_DATE.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listParamSamplesPerGmtDate != null && message.hasOwnProperty("listParamSamplesPerGmtDate")) {
            if (!Array.isArray(message.listParamSamplesPerGmtDate))
                return "listParamSamplesPerGmtDate: array expected";
            for (var i = 0; i < message.listParamSamplesPerGmtDate.length; ++i) {
                var error = $root.PARAM_SAMPLES_PERGMT_DATE.verify(message.listParamSamplesPerGmtDate[i]);
                if (error)
                    return "listParamSamplesPerGmtDate." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MULTI_PARAM_SAMPLES_PERGMT_DATE message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MULTI_PARAM_SAMPLES_PERGMT_DATE} MULTI_PARAM_SAMPLES_PERGMT_DATE
     */
    MULTI_PARAM_SAMPLES_PERGMT_DATE.fromObject = function fromObject(object) {
        if (object instanceof $root.MULTI_PARAM_SAMPLES_PERGMT_DATE)
            return object;
        var message = new $root.MULTI_PARAM_SAMPLES_PERGMT_DATE();
        if (object.listParamSamplesPerGmtDate) {
            if (!Array.isArray(object.listParamSamplesPerGmtDate))
                throw TypeError(".MULTI_PARAM_SAMPLES_PERGMT_DATE.listParamSamplesPerGmtDate: array expected");
            message.listParamSamplesPerGmtDate = [];
            for (var i = 0; i < object.listParamSamplesPerGmtDate.length; ++i) {
                if (typeof object.listParamSamplesPerGmtDate[i] !== "object")
                    throw TypeError(".MULTI_PARAM_SAMPLES_PERGMT_DATE.listParamSamplesPerGmtDate: object expected");
                message.listParamSamplesPerGmtDate[i] = $root.PARAM_SAMPLES_PERGMT_DATE.fromObject(object.listParamSamplesPerGmtDate[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MULTI_PARAM_SAMPLES_PERGMT_DATE message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @static
     * @param {MULTI_PARAM_SAMPLES_PERGMT_DATE} message MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MULTI_PARAM_SAMPLES_PERGMT_DATE.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listParamSamplesPerGmtDate = [];
        if (message.listParamSamplesPerGmtDate && message.listParamSamplesPerGmtDate.length) {
            object.listParamSamplesPerGmtDate = [];
            for (var j = 0; j < message.listParamSamplesPerGmtDate.length; ++j)
                object.listParamSamplesPerGmtDate[j] = $root.PARAM_SAMPLES_PERGMT_DATE.toObject(message.listParamSamplesPerGmtDate[j], options);
        }
        return object;
    };

    /**
     * Converts this MULTI_PARAM_SAMPLES_PERGMT_DATE to JSON.
     * @function toJSON
     * @memberof MULTI_PARAM_SAMPLES_PERGMT_DATE
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MULTI_PARAM_SAMPLES_PERGMT_DATE.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MULTI_PARAM_SAMPLES_PERGMT_DATE;
})();

$root.PARAM_SAMPLE_MINMAX = (function() {

    /**
     * Properties of a PARAM_SAMPLE_MINMAX.
     * @exports IPARAM_SAMPLE_MINMAX
     * @interface IPARAM_SAMPLE_MINMAX
     * @property {IPARAM_SAMPLE|null} [objParamSampleMin] PARAM_SAMPLE_MINMAX objParamSampleMin
     * @property {IPARAM_SAMPLE|null} [objParamSampleMax] PARAM_SAMPLE_MINMAX objParamSampleMax
     */

    /**
     * Constructs a new PARAM_SAMPLE_MINMAX.
     * @exports PARAM_SAMPLE_MINMAX
     * @classdesc Represents a PARAM_SAMPLE_MINMAX.
     * @implements IPARAM_SAMPLE_MINMAX
     * @constructor
     * @param {IPARAM_SAMPLE_MINMAX=} [properties] Properties to set
     */
    function PARAM_SAMPLE_MINMAX(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PARAM_SAMPLE_MINMAX objParamSampleMin.
     * @member {IPARAM_SAMPLE|null|undefined} objParamSampleMin
     * @memberof PARAM_SAMPLE_MINMAX
     * @instance
     */
    PARAM_SAMPLE_MINMAX.prototype.objParamSampleMin = null;

    /**
     * PARAM_SAMPLE_MINMAX objParamSampleMax.
     * @member {IPARAM_SAMPLE|null|undefined} objParamSampleMax
     * @memberof PARAM_SAMPLE_MINMAX
     * @instance
     */
    PARAM_SAMPLE_MINMAX.prototype.objParamSampleMax = null;

    /**
     * Creates a new PARAM_SAMPLE_MINMAX instance using the specified properties.
     * @function create
     * @memberof PARAM_SAMPLE_MINMAX
     * @static
     * @param {IPARAM_SAMPLE_MINMAX=} [properties] Properties to set
     * @returns {PARAM_SAMPLE_MINMAX} PARAM_SAMPLE_MINMAX instance
     */
    PARAM_SAMPLE_MINMAX.create = function create(properties) {
        return new PARAM_SAMPLE_MINMAX(properties);
    };

    /**
     * Encodes the specified PARAM_SAMPLE_MINMAX message. Does not implicitly {@link PARAM_SAMPLE_MINMAX.verify|verify} messages.
     * @function encode
     * @memberof PARAM_SAMPLE_MINMAX
     * @static
     * @param {IPARAM_SAMPLE_MINMAX} message PARAM_SAMPLE_MINMAX message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLE_MINMAX.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.objParamSampleMin != null && message.hasOwnProperty("objParamSampleMin"))
            $root.PARAM_SAMPLE.encode(message.objParamSampleMin, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.objParamSampleMax != null && message.hasOwnProperty("objParamSampleMax"))
            $root.PARAM_SAMPLE.encode(message.objParamSampleMax, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PARAM_SAMPLE_MINMAX message, length delimited. Does not implicitly {@link PARAM_SAMPLE_MINMAX.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PARAM_SAMPLE_MINMAX
     * @static
     * @param {IPARAM_SAMPLE_MINMAX} message PARAM_SAMPLE_MINMAX message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLE_MINMAX.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PARAM_SAMPLE_MINMAX message from the specified reader or buffer.
     * @function decode
     * @memberof PARAM_SAMPLE_MINMAX
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PARAM_SAMPLE_MINMAX} PARAM_SAMPLE_MINMAX
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLE_MINMAX.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PARAM_SAMPLE_MINMAX();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.objParamSampleMin = $root.PARAM_SAMPLE.decode(reader, reader.uint32());
                break;
            case 2:
                message.objParamSampleMax = $root.PARAM_SAMPLE.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PARAM_SAMPLE_MINMAX message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PARAM_SAMPLE_MINMAX
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PARAM_SAMPLE_MINMAX} PARAM_SAMPLE_MINMAX
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLE_MINMAX.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PARAM_SAMPLE_MINMAX message.
     * @function verify
     * @memberof PARAM_SAMPLE_MINMAX
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PARAM_SAMPLE_MINMAX.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.objParamSampleMin != null && message.hasOwnProperty("objParamSampleMin")) {
            var error = $root.PARAM_SAMPLE.verify(message.objParamSampleMin);
            if (error)
                return "objParamSampleMin." + error;
        }
        if (message.objParamSampleMax != null && message.hasOwnProperty("objParamSampleMax")) {
            var error = $root.PARAM_SAMPLE.verify(message.objParamSampleMax);
            if (error)
                return "objParamSampleMax." + error;
        }
        return null;
    };

    /**
     * Creates a PARAM_SAMPLE_MINMAX message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PARAM_SAMPLE_MINMAX
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PARAM_SAMPLE_MINMAX} PARAM_SAMPLE_MINMAX
     */
    PARAM_SAMPLE_MINMAX.fromObject = function fromObject(object) {
        if (object instanceof $root.PARAM_SAMPLE_MINMAX)
            return object;
        var message = new $root.PARAM_SAMPLE_MINMAX();
        if (object.objParamSampleMin != null) {
            if (typeof object.objParamSampleMin !== "object")
                throw TypeError(".PARAM_SAMPLE_MINMAX.objParamSampleMin: object expected");
            message.objParamSampleMin = $root.PARAM_SAMPLE.fromObject(object.objParamSampleMin);
        }
        if (object.objParamSampleMax != null) {
            if (typeof object.objParamSampleMax !== "object")
                throw TypeError(".PARAM_SAMPLE_MINMAX.objParamSampleMax: object expected");
            message.objParamSampleMax = $root.PARAM_SAMPLE.fromObject(object.objParamSampleMax);
        }
        return message;
    };

    /**
     * Creates a plain object from a PARAM_SAMPLE_MINMAX message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PARAM_SAMPLE_MINMAX
     * @static
     * @param {PARAM_SAMPLE_MINMAX} message PARAM_SAMPLE_MINMAX
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PARAM_SAMPLE_MINMAX.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.objParamSampleMin = null;
            object.objParamSampleMax = null;
        }
        if (message.objParamSampleMin != null && message.hasOwnProperty("objParamSampleMin"))
            object.objParamSampleMin = $root.PARAM_SAMPLE.toObject(message.objParamSampleMin, options);
        if (message.objParamSampleMax != null && message.hasOwnProperty("objParamSampleMax"))
            object.objParamSampleMax = $root.PARAM_SAMPLE.toObject(message.objParamSampleMax, options);
        return object;
    };

    /**
     * Converts this PARAM_SAMPLE_MINMAX to JSON.
     * @function toJSON
     * @memberof PARAM_SAMPLE_MINMAX
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PARAM_SAMPLE_MINMAX.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PARAM_SAMPLE_MINMAX;
})();

$root.PARAM_SAMPLES_MINMAX = (function() {

    /**
     * Properties of a PARAM_SAMPLES_MINMAX.
     * @exports IPARAM_SAMPLES_MINMAX
     * @interface IPARAM_SAMPLES_MINMAX
     * @property {Array.<IPARAM_SAMPLE_MINMAX>|null} [listParamSampleMinMax] PARAM_SAMPLES_MINMAX listParamSampleMinMax
     */

    /**
     * Constructs a new PARAM_SAMPLES_MINMAX.
     * @exports PARAM_SAMPLES_MINMAX
     * @classdesc Represents a PARAM_SAMPLES_MINMAX.
     * @implements IPARAM_SAMPLES_MINMAX
     * @constructor
     * @param {IPARAM_SAMPLES_MINMAX=} [properties] Properties to set
     */
    function PARAM_SAMPLES_MINMAX(properties) {
        this.listParamSampleMinMax = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PARAM_SAMPLES_MINMAX listParamSampleMinMax.
     * @member {Array.<IPARAM_SAMPLE_MINMAX>} listParamSampleMinMax
     * @memberof PARAM_SAMPLES_MINMAX
     * @instance
     */
    PARAM_SAMPLES_MINMAX.prototype.listParamSampleMinMax = $util.emptyArray;

    /**
     * Creates a new PARAM_SAMPLES_MINMAX instance using the specified properties.
     * @function create
     * @memberof PARAM_SAMPLES_MINMAX
     * @static
     * @param {IPARAM_SAMPLES_MINMAX=} [properties] Properties to set
     * @returns {PARAM_SAMPLES_MINMAX} PARAM_SAMPLES_MINMAX instance
     */
    PARAM_SAMPLES_MINMAX.create = function create(properties) {
        return new PARAM_SAMPLES_MINMAX(properties);
    };

    /**
     * Encodes the specified PARAM_SAMPLES_MINMAX message. Does not implicitly {@link PARAM_SAMPLES_MINMAX.verify|verify} messages.
     * @function encode
     * @memberof PARAM_SAMPLES_MINMAX
     * @static
     * @param {IPARAM_SAMPLES_MINMAX} message PARAM_SAMPLES_MINMAX message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES_MINMAX.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listParamSampleMinMax != null && message.listParamSampleMinMax.length)
            for (var i = 0; i < message.listParamSampleMinMax.length; ++i)
                $root.PARAM_SAMPLE_MINMAX.encode(message.listParamSampleMinMax[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PARAM_SAMPLES_MINMAX message, length delimited. Does not implicitly {@link PARAM_SAMPLES_MINMAX.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PARAM_SAMPLES_MINMAX
     * @static
     * @param {IPARAM_SAMPLES_MINMAX} message PARAM_SAMPLES_MINMAX message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES_MINMAX.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PARAM_SAMPLES_MINMAX message from the specified reader or buffer.
     * @function decode
     * @memberof PARAM_SAMPLES_MINMAX
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PARAM_SAMPLES_MINMAX} PARAM_SAMPLES_MINMAX
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES_MINMAX.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PARAM_SAMPLES_MINMAX();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listParamSampleMinMax && message.listParamSampleMinMax.length))
                    message.listParamSampleMinMax = [];
                message.listParamSampleMinMax.push($root.PARAM_SAMPLE_MINMAX.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PARAM_SAMPLES_MINMAX message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PARAM_SAMPLES_MINMAX
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PARAM_SAMPLES_MINMAX} PARAM_SAMPLES_MINMAX
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES_MINMAX.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PARAM_SAMPLES_MINMAX message.
     * @function verify
     * @memberof PARAM_SAMPLES_MINMAX
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PARAM_SAMPLES_MINMAX.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listParamSampleMinMax != null && message.hasOwnProperty("listParamSampleMinMax")) {
            if (!Array.isArray(message.listParamSampleMinMax))
                return "listParamSampleMinMax: array expected";
            for (var i = 0; i < message.listParamSampleMinMax.length; ++i) {
                var error = $root.PARAM_SAMPLE_MINMAX.verify(message.listParamSampleMinMax[i]);
                if (error)
                    return "listParamSampleMinMax." + error;
            }
        }
        return null;
    };

    /**
     * Creates a PARAM_SAMPLES_MINMAX message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PARAM_SAMPLES_MINMAX
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PARAM_SAMPLES_MINMAX} PARAM_SAMPLES_MINMAX
     */
    PARAM_SAMPLES_MINMAX.fromObject = function fromObject(object) {
        if (object instanceof $root.PARAM_SAMPLES_MINMAX)
            return object;
        var message = new $root.PARAM_SAMPLES_MINMAX();
        if (object.listParamSampleMinMax) {
            if (!Array.isArray(object.listParamSampleMinMax))
                throw TypeError(".PARAM_SAMPLES_MINMAX.listParamSampleMinMax: array expected");
            message.listParamSampleMinMax = [];
            for (var i = 0; i < object.listParamSampleMinMax.length; ++i) {
                if (typeof object.listParamSampleMinMax[i] !== "object")
                    throw TypeError(".PARAM_SAMPLES_MINMAX.listParamSampleMinMax: object expected");
                message.listParamSampleMinMax[i] = $root.PARAM_SAMPLE_MINMAX.fromObject(object.listParamSampleMinMax[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a PARAM_SAMPLES_MINMAX message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PARAM_SAMPLES_MINMAX
     * @static
     * @param {PARAM_SAMPLES_MINMAX} message PARAM_SAMPLES_MINMAX
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PARAM_SAMPLES_MINMAX.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listParamSampleMinMax = [];
        if (message.listParamSampleMinMax && message.listParamSampleMinMax.length) {
            object.listParamSampleMinMax = [];
            for (var j = 0; j < message.listParamSampleMinMax.length; ++j)
                object.listParamSampleMinMax[j] = $root.PARAM_SAMPLE_MINMAX.toObject(message.listParamSampleMinMax[j], options);
        }
        return object;
    };

    /**
     * Converts this PARAM_SAMPLES_MINMAX to JSON.
     * @function toJSON
     * @memberof PARAM_SAMPLES_MINMAX
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PARAM_SAMPLES_MINMAX.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PARAM_SAMPLES_MINMAX;
})();

$root.MULTI_PARAM_SAMPLES_MINMAX = (function() {

    /**
     * Properties of a MULTI_PARAM_SAMPLES_MINMAX.
     * @exports IMULTI_PARAM_SAMPLES_MINMAX
     * @interface IMULTI_PARAM_SAMPLES_MINMAX
     * @property {Array.<IPARAM_SAMPLES_MINMAX>|null} [listParamSamplesMinMax] MULTI_PARAM_SAMPLES_MINMAX listParamSamplesMinMax
     */

    /**
     * Constructs a new MULTI_PARAM_SAMPLES_MINMAX.
     * @exports MULTI_PARAM_SAMPLES_MINMAX
     * @classdesc Represents a MULTI_PARAM_SAMPLES_MINMAX.
     * @implements IMULTI_PARAM_SAMPLES_MINMAX
     * @constructor
     * @param {IMULTI_PARAM_SAMPLES_MINMAX=} [properties] Properties to set
     */
    function MULTI_PARAM_SAMPLES_MINMAX(properties) {
        this.listParamSamplesMinMax = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MULTI_PARAM_SAMPLES_MINMAX listParamSamplesMinMax.
     * @member {Array.<IPARAM_SAMPLES_MINMAX>} listParamSamplesMinMax
     * @memberof MULTI_PARAM_SAMPLES_MINMAX
     * @instance
     */
    MULTI_PARAM_SAMPLES_MINMAX.prototype.listParamSamplesMinMax = $util.emptyArray;

    /**
     * Creates a new MULTI_PARAM_SAMPLES_MINMAX instance using the specified properties.
     * @function create
     * @memberof MULTI_PARAM_SAMPLES_MINMAX
     * @static
     * @param {IMULTI_PARAM_SAMPLES_MINMAX=} [properties] Properties to set
     * @returns {MULTI_PARAM_SAMPLES_MINMAX} MULTI_PARAM_SAMPLES_MINMAX instance
     */
    MULTI_PARAM_SAMPLES_MINMAX.create = function create(properties) {
        return new MULTI_PARAM_SAMPLES_MINMAX(properties);
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_MINMAX message. Does not implicitly {@link MULTI_PARAM_SAMPLES_MINMAX.verify|verify} messages.
     * @function encode
     * @memberof MULTI_PARAM_SAMPLES_MINMAX
     * @static
     * @param {IMULTI_PARAM_SAMPLES_MINMAX} message MULTI_PARAM_SAMPLES_MINMAX message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_MINMAX.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listParamSamplesMinMax != null && message.listParamSamplesMinMax.length)
            for (var i = 0; i < message.listParamSamplesMinMax.length; ++i)
                $root.PARAM_SAMPLES_MINMAX.encode(message.listParamSamplesMinMax[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_MINMAX message, length delimited. Does not implicitly {@link MULTI_PARAM_SAMPLES_MINMAX.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_MINMAX
     * @static
     * @param {IMULTI_PARAM_SAMPLES_MINMAX} message MULTI_PARAM_SAMPLES_MINMAX message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_MINMAX.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_MINMAX message from the specified reader or buffer.
     * @function decode
     * @memberof MULTI_PARAM_SAMPLES_MINMAX
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MULTI_PARAM_SAMPLES_MINMAX} MULTI_PARAM_SAMPLES_MINMAX
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_MINMAX.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MULTI_PARAM_SAMPLES_MINMAX();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listParamSamplesMinMax && message.listParamSamplesMinMax.length))
                    message.listParamSamplesMinMax = [];
                message.listParamSamplesMinMax.push($root.PARAM_SAMPLES_MINMAX.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_MINMAX message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_MINMAX
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MULTI_PARAM_SAMPLES_MINMAX} MULTI_PARAM_SAMPLES_MINMAX
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_MINMAX.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MULTI_PARAM_SAMPLES_MINMAX message.
     * @function verify
     * @memberof MULTI_PARAM_SAMPLES_MINMAX
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MULTI_PARAM_SAMPLES_MINMAX.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listParamSamplesMinMax != null && message.hasOwnProperty("listParamSamplesMinMax")) {
            if (!Array.isArray(message.listParamSamplesMinMax))
                return "listParamSamplesMinMax: array expected";
            for (var i = 0; i < message.listParamSamplesMinMax.length; ++i) {
                var error = $root.PARAM_SAMPLES_MINMAX.verify(message.listParamSamplesMinMax[i]);
                if (error)
                    return "listParamSamplesMinMax." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MULTI_PARAM_SAMPLES_MINMAX message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MULTI_PARAM_SAMPLES_MINMAX
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MULTI_PARAM_SAMPLES_MINMAX} MULTI_PARAM_SAMPLES_MINMAX
     */
    MULTI_PARAM_SAMPLES_MINMAX.fromObject = function fromObject(object) {
        if (object instanceof $root.MULTI_PARAM_SAMPLES_MINMAX)
            return object;
        var message = new $root.MULTI_PARAM_SAMPLES_MINMAX();
        if (object.listParamSamplesMinMax) {
            if (!Array.isArray(object.listParamSamplesMinMax))
                throw TypeError(".MULTI_PARAM_SAMPLES_MINMAX.listParamSamplesMinMax: array expected");
            message.listParamSamplesMinMax = [];
            for (var i = 0; i < object.listParamSamplesMinMax.length; ++i) {
                if (typeof object.listParamSamplesMinMax[i] !== "object")
                    throw TypeError(".MULTI_PARAM_SAMPLES_MINMAX.listParamSamplesMinMax: object expected");
                message.listParamSamplesMinMax[i] = $root.PARAM_SAMPLES_MINMAX.fromObject(object.listParamSamplesMinMax[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MULTI_PARAM_SAMPLES_MINMAX message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MULTI_PARAM_SAMPLES_MINMAX
     * @static
     * @param {MULTI_PARAM_SAMPLES_MINMAX} message MULTI_PARAM_SAMPLES_MINMAX
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MULTI_PARAM_SAMPLES_MINMAX.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listParamSamplesMinMax = [];
        if (message.listParamSamplesMinMax && message.listParamSamplesMinMax.length) {
            object.listParamSamplesMinMax = [];
            for (var j = 0; j < message.listParamSamplesMinMax.length; ++j)
                object.listParamSamplesMinMax[j] = $root.PARAM_SAMPLES_MINMAX.toObject(message.listParamSamplesMinMax[j], options);
        }
        return object;
    };

    /**
     * Converts this MULTI_PARAM_SAMPLES_MINMAX to JSON.
     * @function toJSON
     * @memberof MULTI_PARAM_SAMPLES_MINMAX
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MULTI_PARAM_SAMPLES_MINMAX.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MULTI_PARAM_SAMPLES_MINMAX;
})();

$root.DUAL_PARAM_SAMPLES_MINMAX = (function() {

    /**
     * Properties of a DUAL_PARAM_SAMPLES_MINMAX.
     * @exports IDUAL_PARAM_SAMPLES_MINMAX
     * @interface IDUAL_PARAM_SAMPLES_MINMAX
     * @property {Array.<IPARAM_SAMPLE>|null} [listParamSamplesMin] DUAL_PARAM_SAMPLES_MINMAX listParamSamplesMin
     * @property {Array.<IPARAM_SAMPLE>|null} [listParamSamplesMax] DUAL_PARAM_SAMPLES_MINMAX listParamSamplesMax
     */

    /**
     * Constructs a new DUAL_PARAM_SAMPLES_MINMAX.
     * @exports DUAL_PARAM_SAMPLES_MINMAX
     * @classdesc Represents a DUAL_PARAM_SAMPLES_MINMAX.
     * @implements IDUAL_PARAM_SAMPLES_MINMAX
     * @constructor
     * @param {IDUAL_PARAM_SAMPLES_MINMAX=} [properties] Properties to set
     */
    function DUAL_PARAM_SAMPLES_MINMAX(properties) {
        this.listParamSamplesMin = [];
        this.listParamSamplesMax = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * DUAL_PARAM_SAMPLES_MINMAX listParamSamplesMin.
     * @member {Array.<IPARAM_SAMPLE>} listParamSamplesMin
     * @memberof DUAL_PARAM_SAMPLES_MINMAX
     * @instance
     */
    DUAL_PARAM_SAMPLES_MINMAX.prototype.listParamSamplesMin = $util.emptyArray;

    /**
     * DUAL_PARAM_SAMPLES_MINMAX listParamSamplesMax.
     * @member {Array.<IPARAM_SAMPLE>} listParamSamplesMax
     * @memberof DUAL_PARAM_SAMPLES_MINMAX
     * @instance
     */
    DUAL_PARAM_SAMPLES_MINMAX.prototype.listParamSamplesMax = $util.emptyArray;

    /**
     * Creates a new DUAL_PARAM_SAMPLES_MINMAX instance using the specified properties.
     * @function create
     * @memberof DUAL_PARAM_SAMPLES_MINMAX
     * @static
     * @param {IDUAL_PARAM_SAMPLES_MINMAX=} [properties] Properties to set
     * @returns {DUAL_PARAM_SAMPLES_MINMAX} DUAL_PARAM_SAMPLES_MINMAX instance
     */
    DUAL_PARAM_SAMPLES_MINMAX.create = function create(properties) {
        return new DUAL_PARAM_SAMPLES_MINMAX(properties);
    };

    /**
     * Encodes the specified DUAL_PARAM_SAMPLES_MINMAX message. Does not implicitly {@link DUAL_PARAM_SAMPLES_MINMAX.verify|verify} messages.
     * @function encode
     * @memberof DUAL_PARAM_SAMPLES_MINMAX
     * @static
     * @param {IDUAL_PARAM_SAMPLES_MINMAX} message DUAL_PARAM_SAMPLES_MINMAX message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DUAL_PARAM_SAMPLES_MINMAX.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listParamSamplesMin != null && message.listParamSamplesMin.length)
            for (var i = 0; i < message.listParamSamplesMin.length; ++i)
                $root.PARAM_SAMPLE.encode(message.listParamSamplesMin[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.listParamSamplesMax != null && message.listParamSamplesMax.length)
            for (var i = 0; i < message.listParamSamplesMax.length; ++i)
                $root.PARAM_SAMPLE.encode(message.listParamSamplesMax[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified DUAL_PARAM_SAMPLES_MINMAX message, length delimited. Does not implicitly {@link DUAL_PARAM_SAMPLES_MINMAX.verify|verify} messages.
     * @function encodeDelimited
     * @memberof DUAL_PARAM_SAMPLES_MINMAX
     * @static
     * @param {IDUAL_PARAM_SAMPLES_MINMAX} message DUAL_PARAM_SAMPLES_MINMAX message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    DUAL_PARAM_SAMPLES_MINMAX.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a DUAL_PARAM_SAMPLES_MINMAX message from the specified reader or buffer.
     * @function decode
     * @memberof DUAL_PARAM_SAMPLES_MINMAX
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {DUAL_PARAM_SAMPLES_MINMAX} DUAL_PARAM_SAMPLES_MINMAX
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DUAL_PARAM_SAMPLES_MINMAX.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.DUAL_PARAM_SAMPLES_MINMAX();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listParamSamplesMin && message.listParamSamplesMin.length))
                    message.listParamSamplesMin = [];
                message.listParamSamplesMin.push($root.PARAM_SAMPLE.decode(reader, reader.uint32()));
                break;
            case 2:
                if (!(message.listParamSamplesMax && message.listParamSamplesMax.length))
                    message.listParamSamplesMax = [];
                message.listParamSamplesMax.push($root.PARAM_SAMPLE.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a DUAL_PARAM_SAMPLES_MINMAX message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof DUAL_PARAM_SAMPLES_MINMAX
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {DUAL_PARAM_SAMPLES_MINMAX} DUAL_PARAM_SAMPLES_MINMAX
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    DUAL_PARAM_SAMPLES_MINMAX.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a DUAL_PARAM_SAMPLES_MINMAX message.
     * @function verify
     * @memberof DUAL_PARAM_SAMPLES_MINMAX
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    DUAL_PARAM_SAMPLES_MINMAX.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listParamSamplesMin != null && message.hasOwnProperty("listParamSamplesMin")) {
            if (!Array.isArray(message.listParamSamplesMin))
                return "listParamSamplesMin: array expected";
            for (var i = 0; i < message.listParamSamplesMin.length; ++i) {
                var error = $root.PARAM_SAMPLE.verify(message.listParamSamplesMin[i]);
                if (error)
                    return "listParamSamplesMin." + error;
            }
        }
        if (message.listParamSamplesMax != null && message.hasOwnProperty("listParamSamplesMax")) {
            if (!Array.isArray(message.listParamSamplesMax))
                return "listParamSamplesMax: array expected";
            for (var i = 0; i < message.listParamSamplesMax.length; ++i) {
                var error = $root.PARAM_SAMPLE.verify(message.listParamSamplesMax[i]);
                if (error)
                    return "listParamSamplesMax." + error;
            }
        }
        return null;
    };

    /**
     * Creates a DUAL_PARAM_SAMPLES_MINMAX message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof DUAL_PARAM_SAMPLES_MINMAX
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {DUAL_PARAM_SAMPLES_MINMAX} DUAL_PARAM_SAMPLES_MINMAX
     */
    DUAL_PARAM_SAMPLES_MINMAX.fromObject = function fromObject(object) {
        if (object instanceof $root.DUAL_PARAM_SAMPLES_MINMAX)
            return object;
        var message = new $root.DUAL_PARAM_SAMPLES_MINMAX();
        if (object.listParamSamplesMin) {
            if (!Array.isArray(object.listParamSamplesMin))
                throw TypeError(".DUAL_PARAM_SAMPLES_MINMAX.listParamSamplesMin: array expected");
            message.listParamSamplesMin = [];
            for (var i = 0; i < object.listParamSamplesMin.length; ++i) {
                if (typeof object.listParamSamplesMin[i] !== "object")
                    throw TypeError(".DUAL_PARAM_SAMPLES_MINMAX.listParamSamplesMin: object expected");
                message.listParamSamplesMin[i] = $root.PARAM_SAMPLE.fromObject(object.listParamSamplesMin[i]);
            }
        }
        if (object.listParamSamplesMax) {
            if (!Array.isArray(object.listParamSamplesMax))
                throw TypeError(".DUAL_PARAM_SAMPLES_MINMAX.listParamSamplesMax: array expected");
            message.listParamSamplesMax = [];
            for (var i = 0; i < object.listParamSamplesMax.length; ++i) {
                if (typeof object.listParamSamplesMax[i] !== "object")
                    throw TypeError(".DUAL_PARAM_SAMPLES_MINMAX.listParamSamplesMax: object expected");
                message.listParamSamplesMax[i] = $root.PARAM_SAMPLE.fromObject(object.listParamSamplesMax[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a DUAL_PARAM_SAMPLES_MINMAX message. Also converts values to other types if specified.
     * @function toObject
     * @memberof DUAL_PARAM_SAMPLES_MINMAX
     * @static
     * @param {DUAL_PARAM_SAMPLES_MINMAX} message DUAL_PARAM_SAMPLES_MINMAX
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    DUAL_PARAM_SAMPLES_MINMAX.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults) {
            object.listParamSamplesMin = [];
            object.listParamSamplesMax = [];
        }
        if (message.listParamSamplesMin && message.listParamSamplesMin.length) {
            object.listParamSamplesMin = [];
            for (var j = 0; j < message.listParamSamplesMin.length; ++j)
                object.listParamSamplesMin[j] = $root.PARAM_SAMPLE.toObject(message.listParamSamplesMin[j], options);
        }
        if (message.listParamSamplesMax && message.listParamSamplesMax.length) {
            object.listParamSamplesMax = [];
            for (var j = 0; j < message.listParamSamplesMax.length; ++j)
                object.listParamSamplesMax[j] = $root.PARAM_SAMPLE.toObject(message.listParamSamplesMax[j], options);
        }
        return object;
    };

    /**
     * Converts this DUAL_PARAM_SAMPLES_MINMAX to JSON.
     * @function toJSON
     * @memberof DUAL_PARAM_SAMPLES_MINMAX
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    DUAL_PARAM_SAMPLES_MINMAX.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return DUAL_PARAM_SAMPLES_MINMAX;
})();

$root.MULTI_PARAM_SAMPLES_MINMAX_REGROUP = (function() {

    /**
     * Properties of a MULTI_PARAM_SAMPLES_MINMAX_REGROUP.
     * @exports IMULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @interface IMULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @property {Array.<IDUAL_PARAM_SAMPLES_MINMAX>|null} [listDualParamSamplesMinMax] MULTI_PARAM_SAMPLES_MINMAX_REGROUP listDualParamSamplesMinMax
     */

    /**
     * Constructs a new MULTI_PARAM_SAMPLES_MINMAX_REGROUP.
     * @exports MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @classdesc Represents a MULTI_PARAM_SAMPLES_MINMAX_REGROUP.
     * @implements IMULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @constructor
     * @param {IMULTI_PARAM_SAMPLES_MINMAX_REGROUP=} [properties] Properties to set
     */
    function MULTI_PARAM_SAMPLES_MINMAX_REGROUP(properties) {
        this.listDualParamSamplesMinMax = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MULTI_PARAM_SAMPLES_MINMAX_REGROUP listDualParamSamplesMinMax.
     * @member {Array.<IDUAL_PARAM_SAMPLES_MINMAX>} listDualParamSamplesMinMax
     * @memberof MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @instance
     */
    MULTI_PARAM_SAMPLES_MINMAX_REGROUP.prototype.listDualParamSamplesMinMax = $util.emptyArray;

    /**
     * Creates a new MULTI_PARAM_SAMPLES_MINMAX_REGROUP instance using the specified properties.
     * @function create
     * @memberof MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @static
     * @param {IMULTI_PARAM_SAMPLES_MINMAX_REGROUP=} [properties] Properties to set
     * @returns {MULTI_PARAM_SAMPLES_MINMAX_REGROUP} MULTI_PARAM_SAMPLES_MINMAX_REGROUP instance
     */
    MULTI_PARAM_SAMPLES_MINMAX_REGROUP.create = function create(properties) {
        return new MULTI_PARAM_SAMPLES_MINMAX_REGROUP(properties);
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_MINMAX_REGROUP message. Does not implicitly {@link MULTI_PARAM_SAMPLES_MINMAX_REGROUP.verify|verify} messages.
     * @function encode
     * @memberof MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @static
     * @param {IMULTI_PARAM_SAMPLES_MINMAX_REGROUP} message MULTI_PARAM_SAMPLES_MINMAX_REGROUP message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_MINMAX_REGROUP.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listDualParamSamplesMinMax != null && message.listDualParamSamplesMinMax.length)
            for (var i = 0; i < message.listDualParamSamplesMinMax.length; ++i)
                $root.DUAL_PARAM_SAMPLES_MINMAX.encode(message.listDualParamSamplesMinMax[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_MINMAX_REGROUP message, length delimited. Does not implicitly {@link MULTI_PARAM_SAMPLES_MINMAX_REGROUP.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @static
     * @param {IMULTI_PARAM_SAMPLES_MINMAX_REGROUP} message MULTI_PARAM_SAMPLES_MINMAX_REGROUP message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_MINMAX_REGROUP.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_MINMAX_REGROUP message from the specified reader or buffer.
     * @function decode
     * @memberof MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MULTI_PARAM_SAMPLES_MINMAX_REGROUP} MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_MINMAX_REGROUP.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MULTI_PARAM_SAMPLES_MINMAX_REGROUP();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listDualParamSamplesMinMax && message.listDualParamSamplesMinMax.length))
                    message.listDualParamSamplesMinMax = [];
                message.listDualParamSamplesMinMax.push($root.DUAL_PARAM_SAMPLES_MINMAX.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_MINMAX_REGROUP message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MULTI_PARAM_SAMPLES_MINMAX_REGROUP} MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_MINMAX_REGROUP.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MULTI_PARAM_SAMPLES_MINMAX_REGROUP message.
     * @function verify
     * @memberof MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MULTI_PARAM_SAMPLES_MINMAX_REGROUP.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listDualParamSamplesMinMax != null && message.hasOwnProperty("listDualParamSamplesMinMax")) {
            if (!Array.isArray(message.listDualParamSamplesMinMax))
                return "listDualParamSamplesMinMax: array expected";
            for (var i = 0; i < message.listDualParamSamplesMinMax.length; ++i) {
                var error = $root.DUAL_PARAM_SAMPLES_MINMAX.verify(message.listDualParamSamplesMinMax[i]);
                if (error)
                    return "listDualParamSamplesMinMax." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MULTI_PARAM_SAMPLES_MINMAX_REGROUP message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MULTI_PARAM_SAMPLES_MINMAX_REGROUP} MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     */
    MULTI_PARAM_SAMPLES_MINMAX_REGROUP.fromObject = function fromObject(object) {
        if (object instanceof $root.MULTI_PARAM_SAMPLES_MINMAX_REGROUP)
            return object;
        var message = new $root.MULTI_PARAM_SAMPLES_MINMAX_REGROUP();
        if (object.listDualParamSamplesMinMax) {
            if (!Array.isArray(object.listDualParamSamplesMinMax))
                throw TypeError(".MULTI_PARAM_SAMPLES_MINMAX_REGROUP.listDualParamSamplesMinMax: array expected");
            message.listDualParamSamplesMinMax = [];
            for (var i = 0; i < object.listDualParamSamplesMinMax.length; ++i) {
                if (typeof object.listDualParamSamplesMinMax[i] !== "object")
                    throw TypeError(".MULTI_PARAM_SAMPLES_MINMAX_REGROUP.listDualParamSamplesMinMax: object expected");
                message.listDualParamSamplesMinMax[i] = $root.DUAL_PARAM_SAMPLES_MINMAX.fromObject(object.listDualParamSamplesMinMax[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MULTI_PARAM_SAMPLES_MINMAX_REGROUP message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @static
     * @param {MULTI_PARAM_SAMPLES_MINMAX_REGROUP} message MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MULTI_PARAM_SAMPLES_MINMAX_REGROUP.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listDualParamSamplesMinMax = [];
        if (message.listDualParamSamplesMinMax && message.listDualParamSamplesMinMax.length) {
            object.listDualParamSamplesMinMax = [];
            for (var j = 0; j < message.listDualParamSamplesMinMax.length; ++j)
                object.listDualParamSamplesMinMax[j] = $root.DUAL_PARAM_SAMPLES_MINMAX.toObject(message.listDualParamSamplesMinMax[j], options);
        }
        return object;
    };

    /**
     * Converts this MULTI_PARAM_SAMPLES_MINMAX_REGROUP to JSON.
     * @function toJSON
     * @memberof MULTI_PARAM_SAMPLES_MINMAX_REGROUP
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MULTI_PARAM_SAMPLES_MINMAX_REGROUP.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MULTI_PARAM_SAMPLES_MINMAX_REGROUP;
})();

$root.STAT_VALUE = (function() {

    /**
     * Properties of a STAT_VALUE.
     * @exports ISTAT_VALUE
     * @interface ISTAT_VALUE
     * @property {IGmt|null} [objGmtStart] STAT_VALUE objGmtStart
     * @property {IGmt|null} [objGmtEnd] STAT_VALUE objGmtEnd
     * @property {IGmt|null} [objGmtMin] STAT_VALUE objGmtMin
     * @property {IGmt|null} [objGmtMax] STAT_VALUE objGmtMax
     * @property {IValue|null} [objValueMin] STAT_VALUE objValueMin
     * @property {IValue|null} [objValueMax] STAT_VALUE objValueMax
     * @property {IValue|null} [objAvgValue] STAT_VALUE objAvgValue
     * @property {IValue|null} [objStdDeviationValue] STAT_VALUE objStdDeviationValue
     */

    /**
     * Constructs a new STAT_VALUE.
     * @exports STAT_VALUE
     * @classdesc Represents a STAT_VALUE.
     * @implements ISTAT_VALUE
     * @constructor
     * @param {ISTAT_VALUE=} [properties] Properties to set
     */
    function STAT_VALUE(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * STAT_VALUE objGmtStart.
     * @member {IGmt|null|undefined} objGmtStart
     * @memberof STAT_VALUE
     * @instance
     */
    STAT_VALUE.prototype.objGmtStart = null;

    /**
     * STAT_VALUE objGmtEnd.
     * @member {IGmt|null|undefined} objGmtEnd
     * @memberof STAT_VALUE
     * @instance
     */
    STAT_VALUE.prototype.objGmtEnd = null;

    /**
     * STAT_VALUE objGmtMin.
     * @member {IGmt|null|undefined} objGmtMin
     * @memberof STAT_VALUE
     * @instance
     */
    STAT_VALUE.prototype.objGmtMin = null;

    /**
     * STAT_VALUE objGmtMax.
     * @member {IGmt|null|undefined} objGmtMax
     * @memberof STAT_VALUE
     * @instance
     */
    STAT_VALUE.prototype.objGmtMax = null;

    /**
     * STAT_VALUE objValueMin.
     * @member {IValue|null|undefined} objValueMin
     * @memberof STAT_VALUE
     * @instance
     */
    STAT_VALUE.prototype.objValueMin = null;

    /**
     * STAT_VALUE objValueMax.
     * @member {IValue|null|undefined} objValueMax
     * @memberof STAT_VALUE
     * @instance
     */
    STAT_VALUE.prototype.objValueMax = null;

    /**
     * STAT_VALUE objAvgValue.
     * @member {IValue|null|undefined} objAvgValue
     * @memberof STAT_VALUE
     * @instance
     */
    STAT_VALUE.prototype.objAvgValue = null;

    /**
     * STAT_VALUE objStdDeviationValue.
     * @member {IValue|null|undefined} objStdDeviationValue
     * @memberof STAT_VALUE
     * @instance
     */
    STAT_VALUE.prototype.objStdDeviationValue = null;

    /**
     * Creates a new STAT_VALUE instance using the specified properties.
     * @function create
     * @memberof STAT_VALUE
     * @static
     * @param {ISTAT_VALUE=} [properties] Properties to set
     * @returns {STAT_VALUE} STAT_VALUE instance
     */
    STAT_VALUE.create = function create(properties) {
        return new STAT_VALUE(properties);
    };

    /**
     * Encodes the specified STAT_VALUE message. Does not implicitly {@link STAT_VALUE.verify|verify} messages.
     * @function encode
     * @memberof STAT_VALUE
     * @static
     * @param {ISTAT_VALUE} message STAT_VALUE message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    STAT_VALUE.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.objGmtStart != null && message.hasOwnProperty("objGmtStart"))
            $root.Gmt.encode(message.objGmtStart, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.objGmtEnd != null && message.hasOwnProperty("objGmtEnd"))
            $root.Gmt.encode(message.objGmtEnd, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.objGmtMin != null && message.hasOwnProperty("objGmtMin"))
            $root.Gmt.encode(message.objGmtMin, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.objGmtMax != null && message.hasOwnProperty("objGmtMax"))
            $root.Gmt.encode(message.objGmtMax, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
        if (message.objValueMin != null && message.hasOwnProperty("objValueMin"))
            $root.Value.encode(message.objValueMin, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
        if (message.objValueMax != null && message.hasOwnProperty("objValueMax"))
            $root.Value.encode(message.objValueMax, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
        if (message.objAvgValue != null && message.hasOwnProperty("objAvgValue"))
            $root.Value.encode(message.objAvgValue, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
        if (message.objStdDeviationValue != null && message.hasOwnProperty("objStdDeviationValue"))
            $root.Value.encode(message.objStdDeviationValue, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified STAT_VALUE message, length delimited. Does not implicitly {@link STAT_VALUE.verify|verify} messages.
     * @function encodeDelimited
     * @memberof STAT_VALUE
     * @static
     * @param {ISTAT_VALUE} message STAT_VALUE message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    STAT_VALUE.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a STAT_VALUE message from the specified reader or buffer.
     * @function decode
     * @memberof STAT_VALUE
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {STAT_VALUE} STAT_VALUE
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    STAT_VALUE.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.STAT_VALUE();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.objGmtStart = $root.Gmt.decode(reader, reader.uint32());
                break;
            case 2:
                message.objGmtEnd = $root.Gmt.decode(reader, reader.uint32());
                break;
            case 3:
                message.objGmtMin = $root.Gmt.decode(reader, reader.uint32());
                break;
            case 4:
                message.objGmtMax = $root.Gmt.decode(reader, reader.uint32());
                break;
            case 5:
                message.objValueMin = $root.Value.decode(reader, reader.uint32());
                break;
            case 6:
                message.objValueMax = $root.Value.decode(reader, reader.uint32());
                break;
            case 7:
                message.objAvgValue = $root.Value.decode(reader, reader.uint32());
                break;
            case 8:
                message.objStdDeviationValue = $root.Value.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a STAT_VALUE message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof STAT_VALUE
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {STAT_VALUE} STAT_VALUE
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    STAT_VALUE.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a STAT_VALUE message.
     * @function verify
     * @memberof STAT_VALUE
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    STAT_VALUE.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.objGmtStart != null && message.hasOwnProperty("objGmtStart")) {
            var error = $root.Gmt.verify(message.objGmtStart);
            if (error)
                return "objGmtStart." + error;
        }
        if (message.objGmtEnd != null && message.hasOwnProperty("objGmtEnd")) {
            var error = $root.Gmt.verify(message.objGmtEnd);
            if (error)
                return "objGmtEnd." + error;
        }
        if (message.objGmtMin != null && message.hasOwnProperty("objGmtMin")) {
            var error = $root.Gmt.verify(message.objGmtMin);
            if (error)
                return "objGmtMin." + error;
        }
        if (message.objGmtMax != null && message.hasOwnProperty("objGmtMax")) {
            var error = $root.Gmt.verify(message.objGmtMax);
            if (error)
                return "objGmtMax." + error;
        }
        if (message.objValueMin != null && message.hasOwnProperty("objValueMin")) {
            var error = $root.Value.verify(message.objValueMin);
            if (error)
                return "objValueMin." + error;
        }
        if (message.objValueMax != null && message.hasOwnProperty("objValueMax")) {
            var error = $root.Value.verify(message.objValueMax);
            if (error)
                return "objValueMax." + error;
        }
        if (message.objAvgValue != null && message.hasOwnProperty("objAvgValue")) {
            var error = $root.Value.verify(message.objAvgValue);
            if (error)
                return "objAvgValue." + error;
        }
        if (message.objStdDeviationValue != null && message.hasOwnProperty("objStdDeviationValue")) {
            var error = $root.Value.verify(message.objStdDeviationValue);
            if (error)
                return "objStdDeviationValue." + error;
        }
        return null;
    };

    /**
     * Creates a STAT_VALUE message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof STAT_VALUE
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {STAT_VALUE} STAT_VALUE
     */
    STAT_VALUE.fromObject = function fromObject(object) {
        if (object instanceof $root.STAT_VALUE)
            return object;
        var message = new $root.STAT_VALUE();
        if (object.objGmtStart != null) {
            if (typeof object.objGmtStart !== "object")
                throw TypeError(".STAT_VALUE.objGmtStart: object expected");
            message.objGmtStart = $root.Gmt.fromObject(object.objGmtStart);
        }
        if (object.objGmtEnd != null) {
            if (typeof object.objGmtEnd !== "object")
                throw TypeError(".STAT_VALUE.objGmtEnd: object expected");
            message.objGmtEnd = $root.Gmt.fromObject(object.objGmtEnd);
        }
        if (object.objGmtMin != null) {
            if (typeof object.objGmtMin !== "object")
                throw TypeError(".STAT_VALUE.objGmtMin: object expected");
            message.objGmtMin = $root.Gmt.fromObject(object.objGmtMin);
        }
        if (object.objGmtMax != null) {
            if (typeof object.objGmtMax !== "object")
                throw TypeError(".STAT_VALUE.objGmtMax: object expected");
            message.objGmtMax = $root.Gmt.fromObject(object.objGmtMax);
        }
        if (object.objValueMin != null) {
            if (typeof object.objValueMin !== "object")
                throw TypeError(".STAT_VALUE.objValueMin: object expected");
            message.objValueMin = $root.Value.fromObject(object.objValueMin);
        }
        if (object.objValueMax != null) {
            if (typeof object.objValueMax !== "object")
                throw TypeError(".STAT_VALUE.objValueMax: object expected");
            message.objValueMax = $root.Value.fromObject(object.objValueMax);
        }
        if (object.objAvgValue != null) {
            if (typeof object.objAvgValue !== "object")
                throw TypeError(".STAT_VALUE.objAvgValue: object expected");
            message.objAvgValue = $root.Value.fromObject(object.objAvgValue);
        }
        if (object.objStdDeviationValue != null) {
            if (typeof object.objStdDeviationValue !== "object")
                throw TypeError(".STAT_VALUE.objStdDeviationValue: object expected");
            message.objStdDeviationValue = $root.Value.fromObject(object.objStdDeviationValue);
        }
        return message;
    };

    /**
     * Creates a plain object from a STAT_VALUE message. Also converts values to other types if specified.
     * @function toObject
     * @memberof STAT_VALUE
     * @static
     * @param {STAT_VALUE} message STAT_VALUE
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    STAT_VALUE.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.objGmtStart = null;
            object.objGmtEnd = null;
            object.objGmtMin = null;
            object.objGmtMax = null;
            object.objValueMin = null;
            object.objValueMax = null;
            object.objAvgValue = null;
            object.objStdDeviationValue = null;
        }
        if (message.objGmtStart != null && message.hasOwnProperty("objGmtStart"))
            object.objGmtStart = $root.Gmt.toObject(message.objGmtStart, options);
        if (message.objGmtEnd != null && message.hasOwnProperty("objGmtEnd"))
            object.objGmtEnd = $root.Gmt.toObject(message.objGmtEnd, options);
        if (message.objGmtMin != null && message.hasOwnProperty("objGmtMin"))
            object.objGmtMin = $root.Gmt.toObject(message.objGmtMin, options);
        if (message.objGmtMax != null && message.hasOwnProperty("objGmtMax"))
            object.objGmtMax = $root.Gmt.toObject(message.objGmtMax, options);
        if (message.objValueMin != null && message.hasOwnProperty("objValueMin"))
            object.objValueMin = $root.Value.toObject(message.objValueMin, options);
        if (message.objValueMax != null && message.hasOwnProperty("objValueMax"))
            object.objValueMax = $root.Value.toObject(message.objValueMax, options);
        if (message.objAvgValue != null && message.hasOwnProperty("objAvgValue"))
            object.objAvgValue = $root.Value.toObject(message.objAvgValue, options);
        if (message.objStdDeviationValue != null && message.hasOwnProperty("objStdDeviationValue"))
            object.objStdDeviationValue = $root.Value.toObject(message.objStdDeviationValue, options);
        return object;
    };

    /**
     * Converts this STAT_VALUE to JSON.
     * @function toJSON
     * @memberof STAT_VALUE
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    STAT_VALUE.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return STAT_VALUE;
})();

$root.PARAM_SAMPLE_STATS = (function() {

    /**
     * Properties of a PARAM_SAMPLE_STATS.
     * @exports IPARAM_SAMPLE_STATS
     * @interface IPARAM_SAMPLE_STATS
     * @property {IGmt|null} [objGmt] PARAM_SAMPLE_STATS objGmt
     * @property {ISTAT_VALUE|null} [objStatValue] PARAM_SAMPLE_STATS objStatValue
     * @property {IStatus|null} [objStatus] PARAM_SAMPLE_STATS objStatus
     */

    /**
     * Constructs a new PARAM_SAMPLE_STATS.
     * @exports PARAM_SAMPLE_STATS
     * @classdesc Represents a PARAM_SAMPLE_STATS.
     * @implements IPARAM_SAMPLE_STATS
     * @constructor
     * @param {IPARAM_SAMPLE_STATS=} [properties] Properties to set
     */
    function PARAM_SAMPLE_STATS(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PARAM_SAMPLE_STATS objGmt.
     * @member {IGmt|null|undefined} objGmt
     * @memberof PARAM_SAMPLE_STATS
     * @instance
     */
    PARAM_SAMPLE_STATS.prototype.objGmt = null;

    /**
     * PARAM_SAMPLE_STATS objStatValue.
     * @member {ISTAT_VALUE|null|undefined} objStatValue
     * @memberof PARAM_SAMPLE_STATS
     * @instance
     */
    PARAM_SAMPLE_STATS.prototype.objStatValue = null;

    /**
     * PARAM_SAMPLE_STATS objStatus.
     * @member {IStatus|null|undefined} objStatus
     * @memberof PARAM_SAMPLE_STATS
     * @instance
     */
    PARAM_SAMPLE_STATS.prototype.objStatus = null;

    /**
     * Creates a new PARAM_SAMPLE_STATS instance using the specified properties.
     * @function create
     * @memberof PARAM_SAMPLE_STATS
     * @static
     * @param {IPARAM_SAMPLE_STATS=} [properties] Properties to set
     * @returns {PARAM_SAMPLE_STATS} PARAM_SAMPLE_STATS instance
     */
    PARAM_SAMPLE_STATS.create = function create(properties) {
        return new PARAM_SAMPLE_STATS(properties);
    };

    /**
     * Encodes the specified PARAM_SAMPLE_STATS message. Does not implicitly {@link PARAM_SAMPLE_STATS.verify|verify} messages.
     * @function encode
     * @memberof PARAM_SAMPLE_STATS
     * @static
     * @param {IPARAM_SAMPLE_STATS} message PARAM_SAMPLE_STATS message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLE_STATS.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.objGmt != null && message.hasOwnProperty("objGmt"))
            $root.Gmt.encode(message.objGmt, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.objStatValue != null && message.hasOwnProperty("objStatValue"))
            $root.STAT_VALUE.encode(message.objStatValue, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.objStatus != null && message.hasOwnProperty("objStatus"))
            $root.Status.encode(message.objStatus, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PARAM_SAMPLE_STATS message, length delimited. Does not implicitly {@link PARAM_SAMPLE_STATS.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PARAM_SAMPLE_STATS
     * @static
     * @param {IPARAM_SAMPLE_STATS} message PARAM_SAMPLE_STATS message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLE_STATS.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PARAM_SAMPLE_STATS message from the specified reader or buffer.
     * @function decode
     * @memberof PARAM_SAMPLE_STATS
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PARAM_SAMPLE_STATS} PARAM_SAMPLE_STATS
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLE_STATS.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PARAM_SAMPLE_STATS();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.objGmt = $root.Gmt.decode(reader, reader.uint32());
                break;
            case 2:
                message.objStatValue = $root.STAT_VALUE.decode(reader, reader.uint32());
                break;
            case 3:
                message.objStatus = $root.Status.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PARAM_SAMPLE_STATS message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PARAM_SAMPLE_STATS
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PARAM_SAMPLE_STATS} PARAM_SAMPLE_STATS
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLE_STATS.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PARAM_SAMPLE_STATS message.
     * @function verify
     * @memberof PARAM_SAMPLE_STATS
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PARAM_SAMPLE_STATS.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.objGmt != null && message.hasOwnProperty("objGmt")) {
            var error = $root.Gmt.verify(message.objGmt);
            if (error)
                return "objGmt." + error;
        }
        if (message.objStatValue != null && message.hasOwnProperty("objStatValue")) {
            var error = $root.STAT_VALUE.verify(message.objStatValue);
            if (error)
                return "objStatValue." + error;
        }
        if (message.objStatus != null && message.hasOwnProperty("objStatus")) {
            var error = $root.Status.verify(message.objStatus);
            if (error)
                return "objStatus." + error;
        }
        return null;
    };

    /**
     * Creates a PARAM_SAMPLE_STATS message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PARAM_SAMPLE_STATS
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PARAM_SAMPLE_STATS} PARAM_SAMPLE_STATS
     */
    PARAM_SAMPLE_STATS.fromObject = function fromObject(object) {
        if (object instanceof $root.PARAM_SAMPLE_STATS)
            return object;
        var message = new $root.PARAM_SAMPLE_STATS();
        if (object.objGmt != null) {
            if (typeof object.objGmt !== "object")
                throw TypeError(".PARAM_SAMPLE_STATS.objGmt: object expected");
            message.objGmt = $root.Gmt.fromObject(object.objGmt);
        }
        if (object.objStatValue != null) {
            if (typeof object.objStatValue !== "object")
                throw TypeError(".PARAM_SAMPLE_STATS.objStatValue: object expected");
            message.objStatValue = $root.STAT_VALUE.fromObject(object.objStatValue);
        }
        if (object.objStatus != null) {
            if (typeof object.objStatus !== "object")
                throw TypeError(".PARAM_SAMPLE_STATS.objStatus: object expected");
            message.objStatus = $root.Status.fromObject(object.objStatus);
        }
        return message;
    };

    /**
     * Creates a plain object from a PARAM_SAMPLE_STATS message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PARAM_SAMPLE_STATS
     * @static
     * @param {PARAM_SAMPLE_STATS} message PARAM_SAMPLE_STATS
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PARAM_SAMPLE_STATS.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.objGmt = null;
            object.objStatValue = null;
            object.objStatus = null;
        }
        if (message.objGmt != null && message.hasOwnProperty("objGmt"))
            object.objGmt = $root.Gmt.toObject(message.objGmt, options);
        if (message.objStatValue != null && message.hasOwnProperty("objStatValue"))
            object.objStatValue = $root.STAT_VALUE.toObject(message.objStatValue, options);
        if (message.objStatus != null && message.hasOwnProperty("objStatus"))
            object.objStatus = $root.Status.toObject(message.objStatus, options);
        return object;
    };

    /**
     * Converts this PARAM_SAMPLE_STATS to JSON.
     * @function toJSON
     * @memberof PARAM_SAMPLE_STATS
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PARAM_SAMPLE_STATS.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PARAM_SAMPLE_STATS;
})();

$root.PARAM_SAMPLES_STATS = (function() {

    /**
     * Properties of a PARAM_SAMPLES_STATS.
     * @exports IPARAM_SAMPLES_STATS
     * @interface IPARAM_SAMPLES_STATS
     * @property {Array.<IPARAM_SAMPLE_STATS>|null} [listParamSampleStats] PARAM_SAMPLES_STATS listParamSampleStats
     */

    /**
     * Constructs a new PARAM_SAMPLES_STATS.
     * @exports PARAM_SAMPLES_STATS
     * @classdesc Represents a PARAM_SAMPLES_STATS.
     * @implements IPARAM_SAMPLES_STATS
     * @constructor
     * @param {IPARAM_SAMPLES_STATS=} [properties] Properties to set
     */
    function PARAM_SAMPLES_STATS(properties) {
        this.listParamSampleStats = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PARAM_SAMPLES_STATS listParamSampleStats.
     * @member {Array.<IPARAM_SAMPLE_STATS>} listParamSampleStats
     * @memberof PARAM_SAMPLES_STATS
     * @instance
     */
    PARAM_SAMPLES_STATS.prototype.listParamSampleStats = $util.emptyArray;

    /**
     * Creates a new PARAM_SAMPLES_STATS instance using the specified properties.
     * @function create
     * @memberof PARAM_SAMPLES_STATS
     * @static
     * @param {IPARAM_SAMPLES_STATS=} [properties] Properties to set
     * @returns {PARAM_SAMPLES_STATS} PARAM_SAMPLES_STATS instance
     */
    PARAM_SAMPLES_STATS.create = function create(properties) {
        return new PARAM_SAMPLES_STATS(properties);
    };

    /**
     * Encodes the specified PARAM_SAMPLES_STATS message. Does not implicitly {@link PARAM_SAMPLES_STATS.verify|verify} messages.
     * @function encode
     * @memberof PARAM_SAMPLES_STATS
     * @static
     * @param {IPARAM_SAMPLES_STATS} message PARAM_SAMPLES_STATS message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES_STATS.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listParamSampleStats != null && message.listParamSampleStats.length)
            for (var i = 0; i < message.listParamSampleStats.length; ++i)
                $root.PARAM_SAMPLE_STATS.encode(message.listParamSampleStats[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PARAM_SAMPLES_STATS message, length delimited. Does not implicitly {@link PARAM_SAMPLES_STATS.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PARAM_SAMPLES_STATS
     * @static
     * @param {IPARAM_SAMPLES_STATS} message PARAM_SAMPLES_STATS message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES_STATS.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PARAM_SAMPLES_STATS message from the specified reader or buffer.
     * @function decode
     * @memberof PARAM_SAMPLES_STATS
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PARAM_SAMPLES_STATS} PARAM_SAMPLES_STATS
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES_STATS.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PARAM_SAMPLES_STATS();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listParamSampleStats && message.listParamSampleStats.length))
                    message.listParamSampleStats = [];
                message.listParamSampleStats.push($root.PARAM_SAMPLE_STATS.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PARAM_SAMPLES_STATS message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PARAM_SAMPLES_STATS
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PARAM_SAMPLES_STATS} PARAM_SAMPLES_STATS
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES_STATS.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PARAM_SAMPLES_STATS message.
     * @function verify
     * @memberof PARAM_SAMPLES_STATS
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PARAM_SAMPLES_STATS.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listParamSampleStats != null && message.hasOwnProperty("listParamSampleStats")) {
            if (!Array.isArray(message.listParamSampleStats))
                return "listParamSampleStats: array expected";
            for (var i = 0; i < message.listParamSampleStats.length; ++i) {
                var error = $root.PARAM_SAMPLE_STATS.verify(message.listParamSampleStats[i]);
                if (error)
                    return "listParamSampleStats." + error;
            }
        }
        return null;
    };

    /**
     * Creates a PARAM_SAMPLES_STATS message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PARAM_SAMPLES_STATS
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PARAM_SAMPLES_STATS} PARAM_SAMPLES_STATS
     */
    PARAM_SAMPLES_STATS.fromObject = function fromObject(object) {
        if (object instanceof $root.PARAM_SAMPLES_STATS)
            return object;
        var message = new $root.PARAM_SAMPLES_STATS();
        if (object.listParamSampleStats) {
            if (!Array.isArray(object.listParamSampleStats))
                throw TypeError(".PARAM_SAMPLES_STATS.listParamSampleStats: array expected");
            message.listParamSampleStats = [];
            for (var i = 0; i < object.listParamSampleStats.length; ++i) {
                if (typeof object.listParamSampleStats[i] !== "object")
                    throw TypeError(".PARAM_SAMPLES_STATS.listParamSampleStats: object expected");
                message.listParamSampleStats[i] = $root.PARAM_SAMPLE_STATS.fromObject(object.listParamSampleStats[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a PARAM_SAMPLES_STATS message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PARAM_SAMPLES_STATS
     * @static
     * @param {PARAM_SAMPLES_STATS} message PARAM_SAMPLES_STATS
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PARAM_SAMPLES_STATS.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listParamSampleStats = [];
        if (message.listParamSampleStats && message.listParamSampleStats.length) {
            object.listParamSampleStats = [];
            for (var j = 0; j < message.listParamSampleStats.length; ++j)
                object.listParamSampleStats[j] = $root.PARAM_SAMPLE_STATS.toObject(message.listParamSampleStats[j], options);
        }
        return object;
    };

    /**
     * Converts this PARAM_SAMPLES_STATS to JSON.
     * @function toJSON
     * @memberof PARAM_SAMPLES_STATS
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PARAM_SAMPLES_STATS.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PARAM_SAMPLES_STATS;
})();

$root.MULTI_PARAM_SAMPLES_STATS = (function() {

    /**
     * Properties of a MULTI_PARAM_SAMPLES_STATS.
     * @exports IMULTI_PARAM_SAMPLES_STATS
     * @interface IMULTI_PARAM_SAMPLES_STATS
     * @property {Array.<IPARAM_SAMPLES_STATS>|null} [listParamSamplesStats] MULTI_PARAM_SAMPLES_STATS listParamSamplesStats
     */

    /**
     * Constructs a new MULTI_PARAM_SAMPLES_STATS.
     * @exports MULTI_PARAM_SAMPLES_STATS
     * @classdesc Represents a MULTI_PARAM_SAMPLES_STATS.
     * @implements IMULTI_PARAM_SAMPLES_STATS
     * @constructor
     * @param {IMULTI_PARAM_SAMPLES_STATS=} [properties] Properties to set
     */
    function MULTI_PARAM_SAMPLES_STATS(properties) {
        this.listParamSamplesStats = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MULTI_PARAM_SAMPLES_STATS listParamSamplesStats.
     * @member {Array.<IPARAM_SAMPLES_STATS>} listParamSamplesStats
     * @memberof MULTI_PARAM_SAMPLES_STATS
     * @instance
     */
    MULTI_PARAM_SAMPLES_STATS.prototype.listParamSamplesStats = $util.emptyArray;

    /**
     * Creates a new MULTI_PARAM_SAMPLES_STATS instance using the specified properties.
     * @function create
     * @memberof MULTI_PARAM_SAMPLES_STATS
     * @static
     * @param {IMULTI_PARAM_SAMPLES_STATS=} [properties] Properties to set
     * @returns {MULTI_PARAM_SAMPLES_STATS} MULTI_PARAM_SAMPLES_STATS instance
     */
    MULTI_PARAM_SAMPLES_STATS.create = function create(properties) {
        return new MULTI_PARAM_SAMPLES_STATS(properties);
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_STATS message. Does not implicitly {@link MULTI_PARAM_SAMPLES_STATS.verify|verify} messages.
     * @function encode
     * @memberof MULTI_PARAM_SAMPLES_STATS
     * @static
     * @param {IMULTI_PARAM_SAMPLES_STATS} message MULTI_PARAM_SAMPLES_STATS message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_STATS.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listParamSamplesStats != null && message.listParamSamplesStats.length)
            for (var i = 0; i < message.listParamSamplesStats.length; ++i)
                $root.PARAM_SAMPLES_STATS.encode(message.listParamSamplesStats[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_STATS message, length delimited. Does not implicitly {@link MULTI_PARAM_SAMPLES_STATS.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_STATS
     * @static
     * @param {IMULTI_PARAM_SAMPLES_STATS} message MULTI_PARAM_SAMPLES_STATS message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_STATS.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_STATS message from the specified reader or buffer.
     * @function decode
     * @memberof MULTI_PARAM_SAMPLES_STATS
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MULTI_PARAM_SAMPLES_STATS} MULTI_PARAM_SAMPLES_STATS
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_STATS.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MULTI_PARAM_SAMPLES_STATS();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listParamSamplesStats && message.listParamSamplesStats.length))
                    message.listParamSamplesStats = [];
                message.listParamSamplesStats.push($root.PARAM_SAMPLES_STATS.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_STATS message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_STATS
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MULTI_PARAM_SAMPLES_STATS} MULTI_PARAM_SAMPLES_STATS
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_STATS.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MULTI_PARAM_SAMPLES_STATS message.
     * @function verify
     * @memberof MULTI_PARAM_SAMPLES_STATS
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MULTI_PARAM_SAMPLES_STATS.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listParamSamplesStats != null && message.hasOwnProperty("listParamSamplesStats")) {
            if (!Array.isArray(message.listParamSamplesStats))
                return "listParamSamplesStats: array expected";
            for (var i = 0; i < message.listParamSamplesStats.length; ++i) {
                var error = $root.PARAM_SAMPLES_STATS.verify(message.listParamSamplesStats[i]);
                if (error)
                    return "listParamSamplesStats." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MULTI_PARAM_SAMPLES_STATS message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MULTI_PARAM_SAMPLES_STATS
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MULTI_PARAM_SAMPLES_STATS} MULTI_PARAM_SAMPLES_STATS
     */
    MULTI_PARAM_SAMPLES_STATS.fromObject = function fromObject(object) {
        if (object instanceof $root.MULTI_PARAM_SAMPLES_STATS)
            return object;
        var message = new $root.MULTI_PARAM_SAMPLES_STATS();
        if (object.listParamSamplesStats) {
            if (!Array.isArray(object.listParamSamplesStats))
                throw TypeError(".MULTI_PARAM_SAMPLES_STATS.listParamSamplesStats: array expected");
            message.listParamSamplesStats = [];
            for (var i = 0; i < object.listParamSamplesStats.length; ++i) {
                if (typeof object.listParamSamplesStats[i] !== "object")
                    throw TypeError(".MULTI_PARAM_SAMPLES_STATS.listParamSamplesStats: object expected");
                message.listParamSamplesStats[i] = $root.PARAM_SAMPLES_STATS.fromObject(object.listParamSamplesStats[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MULTI_PARAM_SAMPLES_STATS message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MULTI_PARAM_SAMPLES_STATS
     * @static
     * @param {MULTI_PARAM_SAMPLES_STATS} message MULTI_PARAM_SAMPLES_STATS
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MULTI_PARAM_SAMPLES_STATS.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listParamSamplesStats = [];
        if (message.listParamSamplesStats && message.listParamSamplesStats.length) {
            object.listParamSamplesStats = [];
            for (var j = 0; j < message.listParamSamplesStats.length; ++j)
                object.listParamSamplesStats[j] = $root.PARAM_SAMPLES_STATS.toObject(message.listParamSamplesStats[j], options);
        }
        return object;
    };

    /**
     * Converts this MULTI_PARAM_SAMPLES_STATS to JSON.
     * @function toJSON
     * @memberof MULTI_PARAM_SAMPLES_STATS
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MULTI_PARAM_SAMPLES_STATS.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MULTI_PARAM_SAMPLES_STATS;
})();

$root.STAT_VALUE_STATUS_PAIR_LIST = (function() {

    /**
     * Properties of a STAT_VALUE_STATUS_PAIR_LIST.
     * @exports ISTAT_VALUE_STATUS_PAIR_LIST
     * @interface ISTAT_VALUE_STATUS_PAIR_LIST
     * @property {Array.<STAT_VALUE_STATUS_PAIR_LIST.ISTAT_VALUE_STATUS_PAIR>|null} [listValueStatusPairs] STAT_VALUE_STATUS_PAIR_LIST listValueStatusPairs
     */

    /**
     * Constructs a new STAT_VALUE_STATUS_PAIR_LIST.
     * @exports STAT_VALUE_STATUS_PAIR_LIST
     * @classdesc Represents a STAT_VALUE_STATUS_PAIR_LIST.
     * @implements ISTAT_VALUE_STATUS_PAIR_LIST
     * @constructor
     * @param {ISTAT_VALUE_STATUS_PAIR_LIST=} [properties] Properties to set
     */
    function STAT_VALUE_STATUS_PAIR_LIST(properties) {
        this.listValueStatusPairs = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * STAT_VALUE_STATUS_PAIR_LIST listValueStatusPairs.
     * @member {Array.<STAT_VALUE_STATUS_PAIR_LIST.ISTAT_VALUE_STATUS_PAIR>} listValueStatusPairs
     * @memberof STAT_VALUE_STATUS_PAIR_LIST
     * @instance
     */
    STAT_VALUE_STATUS_PAIR_LIST.prototype.listValueStatusPairs = $util.emptyArray;

    /**
     * Creates a new STAT_VALUE_STATUS_PAIR_LIST instance using the specified properties.
     * @function create
     * @memberof STAT_VALUE_STATUS_PAIR_LIST
     * @static
     * @param {ISTAT_VALUE_STATUS_PAIR_LIST=} [properties] Properties to set
     * @returns {STAT_VALUE_STATUS_PAIR_LIST} STAT_VALUE_STATUS_PAIR_LIST instance
     */
    STAT_VALUE_STATUS_PAIR_LIST.create = function create(properties) {
        return new STAT_VALUE_STATUS_PAIR_LIST(properties);
    };

    /**
     * Encodes the specified STAT_VALUE_STATUS_PAIR_LIST message. Does not implicitly {@link STAT_VALUE_STATUS_PAIR_LIST.verify|verify} messages.
     * @function encode
     * @memberof STAT_VALUE_STATUS_PAIR_LIST
     * @static
     * @param {ISTAT_VALUE_STATUS_PAIR_LIST} message STAT_VALUE_STATUS_PAIR_LIST message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    STAT_VALUE_STATUS_PAIR_LIST.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listValueStatusPairs != null && message.listValueStatusPairs.length)
            for (var i = 0; i < message.listValueStatusPairs.length; ++i)
                $root.STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR.encode(message.listValueStatusPairs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified STAT_VALUE_STATUS_PAIR_LIST message, length delimited. Does not implicitly {@link STAT_VALUE_STATUS_PAIR_LIST.verify|verify} messages.
     * @function encodeDelimited
     * @memberof STAT_VALUE_STATUS_PAIR_LIST
     * @static
     * @param {ISTAT_VALUE_STATUS_PAIR_LIST} message STAT_VALUE_STATUS_PAIR_LIST message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    STAT_VALUE_STATUS_PAIR_LIST.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a STAT_VALUE_STATUS_PAIR_LIST message from the specified reader or buffer.
     * @function decode
     * @memberof STAT_VALUE_STATUS_PAIR_LIST
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {STAT_VALUE_STATUS_PAIR_LIST} STAT_VALUE_STATUS_PAIR_LIST
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    STAT_VALUE_STATUS_PAIR_LIST.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.STAT_VALUE_STATUS_PAIR_LIST();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listValueStatusPairs && message.listValueStatusPairs.length))
                    message.listValueStatusPairs = [];
                message.listValueStatusPairs.push($root.STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a STAT_VALUE_STATUS_PAIR_LIST message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof STAT_VALUE_STATUS_PAIR_LIST
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {STAT_VALUE_STATUS_PAIR_LIST} STAT_VALUE_STATUS_PAIR_LIST
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    STAT_VALUE_STATUS_PAIR_LIST.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a STAT_VALUE_STATUS_PAIR_LIST message.
     * @function verify
     * @memberof STAT_VALUE_STATUS_PAIR_LIST
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    STAT_VALUE_STATUS_PAIR_LIST.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listValueStatusPairs != null && message.hasOwnProperty("listValueStatusPairs")) {
            if (!Array.isArray(message.listValueStatusPairs))
                return "listValueStatusPairs: array expected";
            for (var i = 0; i < message.listValueStatusPairs.length; ++i) {
                var error = $root.STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR.verify(message.listValueStatusPairs[i]);
                if (error)
                    return "listValueStatusPairs." + error;
            }
        }
        return null;
    };

    /**
     * Creates a STAT_VALUE_STATUS_PAIR_LIST message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof STAT_VALUE_STATUS_PAIR_LIST
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {STAT_VALUE_STATUS_PAIR_LIST} STAT_VALUE_STATUS_PAIR_LIST
     */
    STAT_VALUE_STATUS_PAIR_LIST.fromObject = function fromObject(object) {
        if (object instanceof $root.STAT_VALUE_STATUS_PAIR_LIST)
            return object;
        var message = new $root.STAT_VALUE_STATUS_PAIR_LIST();
        if (object.listValueStatusPairs) {
            if (!Array.isArray(object.listValueStatusPairs))
                throw TypeError(".STAT_VALUE_STATUS_PAIR_LIST.listValueStatusPairs: array expected");
            message.listValueStatusPairs = [];
            for (var i = 0; i < object.listValueStatusPairs.length; ++i) {
                if (typeof object.listValueStatusPairs[i] !== "object")
                    throw TypeError(".STAT_VALUE_STATUS_PAIR_LIST.listValueStatusPairs: object expected");
                message.listValueStatusPairs[i] = $root.STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR.fromObject(object.listValueStatusPairs[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a STAT_VALUE_STATUS_PAIR_LIST message. Also converts values to other types if specified.
     * @function toObject
     * @memberof STAT_VALUE_STATUS_PAIR_LIST
     * @static
     * @param {STAT_VALUE_STATUS_PAIR_LIST} message STAT_VALUE_STATUS_PAIR_LIST
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    STAT_VALUE_STATUS_PAIR_LIST.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listValueStatusPairs = [];
        if (message.listValueStatusPairs && message.listValueStatusPairs.length) {
            object.listValueStatusPairs = [];
            for (var j = 0; j < message.listValueStatusPairs.length; ++j)
                object.listValueStatusPairs[j] = $root.STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR.toObject(message.listValueStatusPairs[j], options);
        }
        return object;
    };

    /**
     * Converts this STAT_VALUE_STATUS_PAIR_LIST to JSON.
     * @function toJSON
     * @memberof STAT_VALUE_STATUS_PAIR_LIST
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    STAT_VALUE_STATUS_PAIR_LIST.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR = (function() {

        /**
         * Properties of a STAT_VALUE_STATUS_PAIR.
         * @memberof STAT_VALUE_STATUS_PAIR_LIST
         * @interface ISTAT_VALUE_STATUS_PAIR
         * @property {ISTAT_VALUE|null} [objStatValue] STAT_VALUE_STATUS_PAIR objStatValue
         * @property {IStatus|null} [objStatus] STAT_VALUE_STATUS_PAIR objStatus
         */

        /**
         * Constructs a new STAT_VALUE_STATUS_PAIR.
         * @memberof STAT_VALUE_STATUS_PAIR_LIST
         * @classdesc Represents a STAT_VALUE_STATUS_PAIR.
         * @implements ISTAT_VALUE_STATUS_PAIR
         * @constructor
         * @param {STAT_VALUE_STATUS_PAIR_LIST.ISTAT_VALUE_STATUS_PAIR=} [properties] Properties to set
         */
        function STAT_VALUE_STATUS_PAIR(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * STAT_VALUE_STATUS_PAIR objStatValue.
         * @member {ISTAT_VALUE|null|undefined} objStatValue
         * @memberof STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR
         * @instance
         */
        STAT_VALUE_STATUS_PAIR.prototype.objStatValue = null;

        /**
         * STAT_VALUE_STATUS_PAIR objStatus.
         * @member {IStatus|null|undefined} objStatus
         * @memberof STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR
         * @instance
         */
        STAT_VALUE_STATUS_PAIR.prototype.objStatus = null;

        /**
         * Creates a new STAT_VALUE_STATUS_PAIR instance using the specified properties.
         * @function create
         * @memberof STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR
         * @static
         * @param {STAT_VALUE_STATUS_PAIR_LIST.ISTAT_VALUE_STATUS_PAIR=} [properties] Properties to set
         * @returns {STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR} STAT_VALUE_STATUS_PAIR instance
         */
        STAT_VALUE_STATUS_PAIR.create = function create(properties) {
            return new STAT_VALUE_STATUS_PAIR(properties);
        };

        /**
         * Encodes the specified STAT_VALUE_STATUS_PAIR message. Does not implicitly {@link STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR.verify|verify} messages.
         * @function encode
         * @memberof STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR
         * @static
         * @param {STAT_VALUE_STATUS_PAIR_LIST.ISTAT_VALUE_STATUS_PAIR} message STAT_VALUE_STATUS_PAIR message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        STAT_VALUE_STATUS_PAIR.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.objStatValue != null && message.hasOwnProperty("objStatValue"))
                $root.STAT_VALUE.encode(message.objStatValue, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.objStatus != null && message.hasOwnProperty("objStatus"))
                $root.Status.encode(message.objStatus, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified STAT_VALUE_STATUS_PAIR message, length delimited. Does not implicitly {@link STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR.verify|verify} messages.
         * @function encodeDelimited
         * @memberof STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR
         * @static
         * @param {STAT_VALUE_STATUS_PAIR_LIST.ISTAT_VALUE_STATUS_PAIR} message STAT_VALUE_STATUS_PAIR message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        STAT_VALUE_STATUS_PAIR.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a STAT_VALUE_STATUS_PAIR message from the specified reader or buffer.
         * @function decode
         * @memberof STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR} STAT_VALUE_STATUS_PAIR
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        STAT_VALUE_STATUS_PAIR.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.objStatValue = $root.STAT_VALUE.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.objStatus = $root.Status.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a STAT_VALUE_STATUS_PAIR message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR} STAT_VALUE_STATUS_PAIR
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        STAT_VALUE_STATUS_PAIR.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a STAT_VALUE_STATUS_PAIR message.
         * @function verify
         * @memberof STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        STAT_VALUE_STATUS_PAIR.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.objStatValue != null && message.hasOwnProperty("objStatValue")) {
                var error = $root.STAT_VALUE.verify(message.objStatValue);
                if (error)
                    return "objStatValue." + error;
            }
            if (message.objStatus != null && message.hasOwnProperty("objStatus")) {
                var error = $root.Status.verify(message.objStatus);
                if (error)
                    return "objStatus." + error;
            }
            return null;
        };

        /**
         * Creates a STAT_VALUE_STATUS_PAIR message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR} STAT_VALUE_STATUS_PAIR
         */
        STAT_VALUE_STATUS_PAIR.fromObject = function fromObject(object) {
            if (object instanceof $root.STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR)
                return object;
            var message = new $root.STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR();
            if (object.objStatValue != null) {
                if (typeof object.objStatValue !== "object")
                    throw TypeError(".STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR.objStatValue: object expected");
                message.objStatValue = $root.STAT_VALUE.fromObject(object.objStatValue);
            }
            if (object.objStatus != null) {
                if (typeof object.objStatus !== "object")
                    throw TypeError(".STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR.objStatus: object expected");
                message.objStatus = $root.Status.fromObject(object.objStatus);
            }
            return message;
        };

        /**
         * Creates a plain object from a STAT_VALUE_STATUS_PAIR message. Also converts values to other types if specified.
         * @function toObject
         * @memberof STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR
         * @static
         * @param {STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR} message STAT_VALUE_STATUS_PAIR
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        STAT_VALUE_STATUS_PAIR.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.objStatValue = null;
                object.objStatus = null;
            }
            if (message.objStatValue != null && message.hasOwnProperty("objStatValue"))
                object.objStatValue = $root.STAT_VALUE.toObject(message.objStatValue, options);
            if (message.objStatus != null && message.hasOwnProperty("objStatus"))
                object.objStatus = $root.Status.toObject(message.objStatus, options);
            return object;
        };

        /**
         * Converts this STAT_VALUE_STATUS_PAIR to JSON.
         * @function toJSON
         * @memberof STAT_VALUE_STATUS_PAIR_LIST.STAT_VALUE_STATUS_PAIR
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        STAT_VALUE_STATUS_PAIR.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return STAT_VALUE_STATUS_PAIR;
    })();

    return STAT_VALUE_STATUS_PAIR_LIST;
})();

$root.PARAM_SAMPLES_STATS_PERGMT = (function() {

    /**
     * Properties of a PARAM_SAMPLES_STATS_PERGMT.
     * @exports IPARAM_SAMPLES_STATS_PERGMT
     * @interface IPARAM_SAMPLES_STATS_PERGMT
     * @property {IGmt|null} [objGmt] PARAM_SAMPLES_STATS_PERGMT objGmt
     * @property {ISTAT_VALUE_STATUS_PAIR_LIST|null} [listValueStatusPairs] PARAM_SAMPLES_STATS_PERGMT listValueStatusPairs
     */

    /**
     * Constructs a new PARAM_SAMPLES_STATS_PERGMT.
     * @exports PARAM_SAMPLES_STATS_PERGMT
     * @classdesc Represents a PARAM_SAMPLES_STATS_PERGMT.
     * @implements IPARAM_SAMPLES_STATS_PERGMT
     * @constructor
     * @param {IPARAM_SAMPLES_STATS_PERGMT=} [properties] Properties to set
     */
    function PARAM_SAMPLES_STATS_PERGMT(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * PARAM_SAMPLES_STATS_PERGMT objGmt.
     * @member {IGmt|null|undefined} objGmt
     * @memberof PARAM_SAMPLES_STATS_PERGMT
     * @instance
     */
    PARAM_SAMPLES_STATS_PERGMT.prototype.objGmt = null;

    /**
     * PARAM_SAMPLES_STATS_PERGMT listValueStatusPairs.
     * @member {ISTAT_VALUE_STATUS_PAIR_LIST|null|undefined} listValueStatusPairs
     * @memberof PARAM_SAMPLES_STATS_PERGMT
     * @instance
     */
    PARAM_SAMPLES_STATS_PERGMT.prototype.listValueStatusPairs = null;

    /**
     * Creates a new PARAM_SAMPLES_STATS_PERGMT instance using the specified properties.
     * @function create
     * @memberof PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {IPARAM_SAMPLES_STATS_PERGMT=} [properties] Properties to set
     * @returns {PARAM_SAMPLES_STATS_PERGMT} PARAM_SAMPLES_STATS_PERGMT instance
     */
    PARAM_SAMPLES_STATS_PERGMT.create = function create(properties) {
        return new PARAM_SAMPLES_STATS_PERGMT(properties);
    };

    /**
     * Encodes the specified PARAM_SAMPLES_STATS_PERGMT message. Does not implicitly {@link PARAM_SAMPLES_STATS_PERGMT.verify|verify} messages.
     * @function encode
     * @memberof PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {IPARAM_SAMPLES_STATS_PERGMT} message PARAM_SAMPLES_STATS_PERGMT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES_STATS_PERGMT.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.objGmt != null && message.hasOwnProperty("objGmt"))
            $root.Gmt.encode(message.objGmt, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        if (message.listValueStatusPairs != null && message.hasOwnProperty("listValueStatusPairs"))
            $root.STAT_VALUE_STATUS_PAIR_LIST.encode(message.listValueStatusPairs, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified PARAM_SAMPLES_STATS_PERGMT message, length delimited. Does not implicitly {@link PARAM_SAMPLES_STATS_PERGMT.verify|verify} messages.
     * @function encodeDelimited
     * @memberof PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {IPARAM_SAMPLES_STATS_PERGMT} message PARAM_SAMPLES_STATS_PERGMT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PARAM_SAMPLES_STATS_PERGMT.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a PARAM_SAMPLES_STATS_PERGMT message from the specified reader or buffer.
     * @function decode
     * @memberof PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {PARAM_SAMPLES_STATS_PERGMT} PARAM_SAMPLES_STATS_PERGMT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES_STATS_PERGMT.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.PARAM_SAMPLES_STATS_PERGMT();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.objGmt = $root.Gmt.decode(reader, reader.uint32());
                break;
            case 2:
                message.listValueStatusPairs = $root.STAT_VALUE_STATUS_PAIR_LIST.decode(reader, reader.uint32());
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a PARAM_SAMPLES_STATS_PERGMT message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {PARAM_SAMPLES_STATS_PERGMT} PARAM_SAMPLES_STATS_PERGMT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PARAM_SAMPLES_STATS_PERGMT.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a PARAM_SAMPLES_STATS_PERGMT message.
     * @function verify
     * @memberof PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    PARAM_SAMPLES_STATS_PERGMT.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.objGmt != null && message.hasOwnProperty("objGmt")) {
            var error = $root.Gmt.verify(message.objGmt);
            if (error)
                return "objGmt." + error;
        }
        if (message.listValueStatusPairs != null && message.hasOwnProperty("listValueStatusPairs")) {
            var error = $root.STAT_VALUE_STATUS_PAIR_LIST.verify(message.listValueStatusPairs);
            if (error)
                return "listValueStatusPairs." + error;
        }
        return null;
    };

    /**
     * Creates a PARAM_SAMPLES_STATS_PERGMT message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {PARAM_SAMPLES_STATS_PERGMT} PARAM_SAMPLES_STATS_PERGMT
     */
    PARAM_SAMPLES_STATS_PERGMT.fromObject = function fromObject(object) {
        if (object instanceof $root.PARAM_SAMPLES_STATS_PERGMT)
            return object;
        var message = new $root.PARAM_SAMPLES_STATS_PERGMT();
        if (object.objGmt != null) {
            if (typeof object.objGmt !== "object")
                throw TypeError(".PARAM_SAMPLES_STATS_PERGMT.objGmt: object expected");
            message.objGmt = $root.Gmt.fromObject(object.objGmt);
        }
        if (object.listValueStatusPairs != null) {
            if (typeof object.listValueStatusPairs !== "object")
                throw TypeError(".PARAM_SAMPLES_STATS_PERGMT.listValueStatusPairs: object expected");
            message.listValueStatusPairs = $root.STAT_VALUE_STATUS_PAIR_LIST.fromObject(object.listValueStatusPairs);
        }
        return message;
    };

    /**
     * Creates a plain object from a PARAM_SAMPLES_STATS_PERGMT message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {PARAM_SAMPLES_STATS_PERGMT} message PARAM_SAMPLES_STATS_PERGMT
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PARAM_SAMPLES_STATS_PERGMT.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.objGmt = null;
            object.listValueStatusPairs = null;
        }
        if (message.objGmt != null && message.hasOwnProperty("objGmt"))
            object.objGmt = $root.Gmt.toObject(message.objGmt, options);
        if (message.listValueStatusPairs != null && message.hasOwnProperty("listValueStatusPairs"))
            object.listValueStatusPairs = $root.STAT_VALUE_STATUS_PAIR_LIST.toObject(message.listValueStatusPairs, options);
        return object;
    };

    /**
     * Converts this PARAM_SAMPLES_STATS_PERGMT to JSON.
     * @function toJSON
     * @memberof PARAM_SAMPLES_STATS_PERGMT
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PARAM_SAMPLES_STATS_PERGMT.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PARAM_SAMPLES_STATS_PERGMT;
})();

$root.MULTI_PARAM_SAMPLES_STATS_PERGMT = (function() {

    /**
     * Properties of a MULTI_PARAM_SAMPLES_STATS_PERGMT.
     * @exports IMULTI_PARAM_SAMPLES_STATS_PERGMT
     * @interface IMULTI_PARAM_SAMPLES_STATS_PERGMT
     * @property {Array.<IPARAM_SAMPLES_STATS_PERGMT>|null} [listParamSamplesStatsPerGmt] MULTI_PARAM_SAMPLES_STATS_PERGMT listParamSamplesStatsPerGmt
     */

    /**
     * Constructs a new MULTI_PARAM_SAMPLES_STATS_PERGMT.
     * @exports MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @classdesc Represents a MULTI_PARAM_SAMPLES_STATS_PERGMT.
     * @implements IMULTI_PARAM_SAMPLES_STATS_PERGMT
     * @constructor
     * @param {IMULTI_PARAM_SAMPLES_STATS_PERGMT=} [properties] Properties to set
     */
    function MULTI_PARAM_SAMPLES_STATS_PERGMT(properties) {
        this.listParamSamplesStatsPerGmt = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * MULTI_PARAM_SAMPLES_STATS_PERGMT listParamSamplesStatsPerGmt.
     * @member {Array.<IPARAM_SAMPLES_STATS_PERGMT>} listParamSamplesStatsPerGmt
     * @memberof MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @instance
     */
    MULTI_PARAM_SAMPLES_STATS_PERGMT.prototype.listParamSamplesStatsPerGmt = $util.emptyArray;

    /**
     * Creates a new MULTI_PARAM_SAMPLES_STATS_PERGMT instance using the specified properties.
     * @function create
     * @memberof MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {IMULTI_PARAM_SAMPLES_STATS_PERGMT=} [properties] Properties to set
     * @returns {MULTI_PARAM_SAMPLES_STATS_PERGMT} MULTI_PARAM_SAMPLES_STATS_PERGMT instance
     */
    MULTI_PARAM_SAMPLES_STATS_PERGMT.create = function create(properties) {
        return new MULTI_PARAM_SAMPLES_STATS_PERGMT(properties);
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_STATS_PERGMT message. Does not implicitly {@link MULTI_PARAM_SAMPLES_STATS_PERGMT.verify|verify} messages.
     * @function encode
     * @memberof MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {IMULTI_PARAM_SAMPLES_STATS_PERGMT} message MULTI_PARAM_SAMPLES_STATS_PERGMT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_STATS_PERGMT.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listParamSamplesStatsPerGmt != null && message.listParamSamplesStatsPerGmt.length)
            for (var i = 0; i < message.listParamSamplesStatsPerGmt.length; ++i)
                $root.PARAM_SAMPLES_STATS_PERGMT.encode(message.listParamSamplesStatsPerGmt[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified MULTI_PARAM_SAMPLES_STATS_PERGMT message, length delimited. Does not implicitly {@link MULTI_PARAM_SAMPLES_STATS_PERGMT.verify|verify} messages.
     * @function encodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {IMULTI_PARAM_SAMPLES_STATS_PERGMT} message MULTI_PARAM_SAMPLES_STATS_PERGMT message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    MULTI_PARAM_SAMPLES_STATS_PERGMT.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_STATS_PERGMT message from the specified reader or buffer.
     * @function decode
     * @memberof MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {MULTI_PARAM_SAMPLES_STATS_PERGMT} MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_STATS_PERGMT.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.MULTI_PARAM_SAMPLES_STATS_PERGMT();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listParamSamplesStatsPerGmt && message.listParamSamplesStatsPerGmt.length))
                    message.listParamSamplesStatsPerGmt = [];
                message.listParamSamplesStatsPerGmt.push($root.PARAM_SAMPLES_STATS_PERGMT.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a MULTI_PARAM_SAMPLES_STATS_PERGMT message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {MULTI_PARAM_SAMPLES_STATS_PERGMT} MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    MULTI_PARAM_SAMPLES_STATS_PERGMT.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a MULTI_PARAM_SAMPLES_STATS_PERGMT message.
     * @function verify
     * @memberof MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    MULTI_PARAM_SAMPLES_STATS_PERGMT.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listParamSamplesStatsPerGmt != null && message.hasOwnProperty("listParamSamplesStatsPerGmt")) {
            if (!Array.isArray(message.listParamSamplesStatsPerGmt))
                return "listParamSamplesStatsPerGmt: array expected";
            for (var i = 0; i < message.listParamSamplesStatsPerGmt.length; ++i) {
                var error = $root.PARAM_SAMPLES_STATS_PERGMT.verify(message.listParamSamplesStatsPerGmt[i]);
                if (error)
                    return "listParamSamplesStatsPerGmt." + error;
            }
        }
        return null;
    };

    /**
     * Creates a MULTI_PARAM_SAMPLES_STATS_PERGMT message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {MULTI_PARAM_SAMPLES_STATS_PERGMT} MULTI_PARAM_SAMPLES_STATS_PERGMT
     */
    MULTI_PARAM_SAMPLES_STATS_PERGMT.fromObject = function fromObject(object) {
        if (object instanceof $root.MULTI_PARAM_SAMPLES_STATS_PERGMT)
            return object;
        var message = new $root.MULTI_PARAM_SAMPLES_STATS_PERGMT();
        if (object.listParamSamplesStatsPerGmt) {
            if (!Array.isArray(object.listParamSamplesStatsPerGmt))
                throw TypeError(".MULTI_PARAM_SAMPLES_STATS_PERGMT.listParamSamplesStatsPerGmt: array expected");
            message.listParamSamplesStatsPerGmt = [];
            for (var i = 0; i < object.listParamSamplesStatsPerGmt.length; ++i) {
                if (typeof object.listParamSamplesStatsPerGmt[i] !== "object")
                    throw TypeError(".MULTI_PARAM_SAMPLES_STATS_PERGMT.listParamSamplesStatsPerGmt: object expected");
                message.listParamSamplesStatsPerGmt[i] = $root.PARAM_SAMPLES_STATS_PERGMT.fromObject(object.listParamSamplesStatsPerGmt[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a MULTI_PARAM_SAMPLES_STATS_PERGMT message. Also converts values to other types if specified.
     * @function toObject
     * @memberof MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @static
     * @param {MULTI_PARAM_SAMPLES_STATS_PERGMT} message MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    MULTI_PARAM_SAMPLES_STATS_PERGMT.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listParamSamplesStatsPerGmt = [];
        if (message.listParamSamplesStatsPerGmt && message.listParamSamplesStatsPerGmt.length) {
            object.listParamSamplesStatsPerGmt = [];
            for (var j = 0; j < message.listParamSamplesStatsPerGmt.length; ++j)
                object.listParamSamplesStatsPerGmt[j] = $root.PARAM_SAMPLES_STATS_PERGMT.toObject(message.listParamSamplesStatsPerGmt[j], options);
        }
        return object;
    };

    /**
     * Converts this MULTI_PARAM_SAMPLES_STATS_PERGMT to JSON.
     * @function toJSON
     * @memberof MULTI_PARAM_SAMPLES_STATS_PERGMT
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    MULTI_PARAM_SAMPLES_STATS_PERGMT.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return MULTI_PARAM_SAMPLES_STATS_PERGMT;
})();

$root.Value = (function() {

    /**
     * Properties of a Value.
     * @exports IValue
     * @interface IValue
     * @property {number|null} [dblValueType] Value dblValueType
     * @property {number|Long|null} [longValueType] Value longValueType
     * @property {boolean|null} [blnValueType] Value blnValueType
     * @property {string|null} [strValueType] Value strValueType
     * @property {Uint8Array|null} [bufValueType] Value bufValueType
     */

    /**
     * Constructs a new Value.
     * @exports Value
     * @classdesc Represents a Value.
     * @implements IValue
     * @constructor
     * @param {IValue=} [properties] Properties to set
     */
    function Value(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Value dblValueType.
     * @member {number} dblValueType
     * @memberof Value
     * @instance
     */
    Value.prototype.dblValueType = 0;

    /**
     * Value longValueType.
     * @member {number|Long} longValueType
     * @memberof Value
     * @instance
     */
    Value.prototype.longValueType = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Value blnValueType.
     * @member {boolean} blnValueType
     * @memberof Value
     * @instance
     */
    Value.prototype.blnValueType = false;

    /**
     * Value strValueType.
     * @member {string} strValueType
     * @memberof Value
     * @instance
     */
    Value.prototype.strValueType = "";

    /**
     * Value bufValueType.
     * @member {Uint8Array} bufValueType
     * @memberof Value
     * @instance
     */
    Value.prototype.bufValueType = $util.newBuffer([]);

    /**
     * Creates a new Value instance using the specified properties.
     * @function create
     * @memberof Value
     * @static
     * @param {IValue=} [properties] Properties to set
     * @returns {Value} Value instance
     */
    Value.create = function create(properties) {
        return new Value(properties);
    };

    /**
     * Encodes the specified Value message. Does not implicitly {@link Value.verify|verify} messages.
     * @function encode
     * @memberof Value
     * @static
     * @param {IValue} message Value message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Value.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.dblValueType != null && message.hasOwnProperty("dblValueType"))
            writer.uint32(/* id 1, wireType 1 =*/9).double(message.dblValueType);
        if (message.longValueType != null && message.hasOwnProperty("longValueType"))
            writer.uint32(/* id 2, wireType 0 =*/16).int64(message.longValueType);
        if (message.blnValueType != null && message.hasOwnProperty("blnValueType"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.blnValueType);
        if (message.strValueType != null && message.hasOwnProperty("strValueType"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.strValueType);
        if (message.bufValueType != null && message.hasOwnProperty("bufValueType"))
            writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.bufValueType);
        return writer;
    };

    /**
     * Encodes the specified Value message, length delimited. Does not implicitly {@link Value.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Value
     * @static
     * @param {IValue} message Value message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Value.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Value message from the specified reader or buffer.
     * @function decode
     * @memberof Value
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Value} Value
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Value.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Value();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.dblValueType = reader.double();
                break;
            case 2:
                message.longValueType = reader.int64();
                break;
            case 3:
                message.blnValueType = reader.bool();
                break;
            case 4:
                message.strValueType = reader.string();
                break;
            case 5:
                message.bufValueType = reader.bytes();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Value message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Value
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Value} Value
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Value.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Value message.
     * @function verify
     * @memberof Value
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Value.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.dblValueType != null && message.hasOwnProperty("dblValueType"))
            if (typeof message.dblValueType !== "number")
                return "dblValueType: number expected";
        if (message.longValueType != null && message.hasOwnProperty("longValueType"))
            if (!$util.isInteger(message.longValueType) && !(message.longValueType && $util.isInteger(message.longValueType.low) && $util.isInteger(message.longValueType.high)))
                return "longValueType: integer|Long expected";
        if (message.blnValueType != null && message.hasOwnProperty("blnValueType"))
            if (typeof message.blnValueType !== "boolean")
                return "blnValueType: boolean expected";
        if (message.strValueType != null && message.hasOwnProperty("strValueType"))
            if (!$util.isString(message.strValueType))
                return "strValueType: string expected";
        if (message.bufValueType != null && message.hasOwnProperty("bufValueType"))
            if (!(message.bufValueType && typeof message.bufValueType.length === "number" || $util.isString(message.bufValueType)))
                return "bufValueType: buffer expected";
        return null;
    };

    /**
     * Creates a Value message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Value
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Value} Value
     */
    Value.fromObject = function fromObject(object) {
        if (object instanceof $root.Value)
            return object;
        var message = new $root.Value();
        if (object.dblValueType != null)
            message.dblValueType = Number(object.dblValueType);
        if (object.longValueType != null)
            if ($util.Long)
                (message.longValueType = $util.Long.fromValue(object.longValueType)).unsigned = false;
            else if (typeof object.longValueType === "string")
                message.longValueType = parseInt(object.longValueType, 10);
            else if (typeof object.longValueType === "number")
                message.longValueType = object.longValueType;
            else if (typeof object.longValueType === "object")
                message.longValueType = new $util.LongBits(object.longValueType.low >>> 0, object.longValueType.high >>> 0).toNumber();
        if (object.blnValueType != null)
            message.blnValueType = Boolean(object.blnValueType);
        if (object.strValueType != null)
            message.strValueType = String(object.strValueType);
        if (object.bufValueType != null)
            if (typeof object.bufValueType === "string")
                $util.base64.decode(object.bufValueType, message.bufValueType = $util.newBuffer($util.base64.length(object.bufValueType)), 0);
            else if (object.bufValueType.length)
                message.bufValueType = object.bufValueType;
        return message;
    };

    /**
     * Creates a plain object from a Value message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Value
     * @static
     * @param {Value} message Value
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Value.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.dblValueType = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.longValueType = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.longValueType = options.longs === String ? "0" : 0;
            object.blnValueType = false;
            object.strValueType = "";
            if (options.bytes === String)
                object.bufValueType = "";
            else {
                object.bufValueType = [];
                if (options.bytes !== Array)
                    object.bufValueType = $util.newBuffer(object.bufValueType);
            }
        }
        if (message.dblValueType != null && message.hasOwnProperty("dblValueType"))
            object.dblValueType = options.json && !isFinite(message.dblValueType) ? String(message.dblValueType) : message.dblValueType;
        if (message.longValueType != null && message.hasOwnProperty("longValueType"))
            if (typeof message.longValueType === "number")
                object.longValueType = options.longs === String ? String(message.longValueType) : message.longValueType;
            else
                object.longValueType = options.longs === String ? $util.Long.prototype.toString.call(message.longValueType) : options.longs === Number ? new $util.LongBits(message.longValueType.low >>> 0, message.longValueType.high >>> 0).toNumber() : message.longValueType;
        if (message.blnValueType != null && message.hasOwnProperty("blnValueType"))
            object.blnValueType = message.blnValueType;
        if (message.strValueType != null && message.hasOwnProperty("strValueType"))
            object.strValueType = message.strValueType;
        if (message.bufValueType != null && message.hasOwnProperty("bufValueType"))
            object.bufValueType = options.bytes === String ? $util.base64.encode(message.bufValueType, 0, message.bufValueType.length) : options.bytes === Array ? Array.prototype.slice.call(message.bufValueType) : message.bufValueType;
        return object;
    };

    /**
     * Converts this Value to JSON.
     * @function toJSON
     * @memberof Value
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Value.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Value;
})();

$root.Status = (function() {

    /**
     * Properties of a Status.
     * @exports IStatus
     * @interface IStatus
     * @property {number|null} [intStatus] Status intStatus
     */

    /**
     * Constructs a new Status.
     * @exports Status
     * @classdesc Represents a Status.
     * @implements IStatus
     * @constructor
     * @param {IStatus=} [properties] Properties to set
     */
    function Status(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Status intStatus.
     * @member {number} intStatus
     * @memberof Status
     * @instance
     */
    Status.prototype.intStatus = 0;

    /**
     * Creates a new Status instance using the specified properties.
     * @function create
     * @memberof Status
     * @static
     * @param {IStatus=} [properties] Properties to set
     * @returns {Status} Status instance
     */
    Status.create = function create(properties) {
        return new Status(properties);
    };

    /**
     * Encodes the specified Status message. Does not implicitly {@link Status.verify|verify} messages.
     * @function encode
     * @memberof Status
     * @static
     * @param {IStatus} message Status message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Status.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.intStatus != null && message.hasOwnProperty("intStatus"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.intStatus);
        return writer;
    };

    /**
     * Encodes the specified Status message, length delimited. Does not implicitly {@link Status.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Status
     * @static
     * @param {IStatus} message Status message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Status.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Status message from the specified reader or buffer.
     * @function decode
     * @memberof Status
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Status} Status
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Status.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Status();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.intStatus = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Status message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Status
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Status} Status
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Status.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Status message.
     * @function verify
     * @memberof Status
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Status.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.intStatus != null && message.hasOwnProperty("intStatus"))
            if (!$util.isInteger(message.intStatus))
                return "intStatus: integer expected";
        return null;
    };

    /**
     * Creates a Status message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Status
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Status} Status
     */
    Status.fromObject = function fromObject(object) {
        if (object instanceof $root.Status)
            return object;
        var message = new $root.Status();
        if (object.intStatus != null)
            message.intStatus = object.intStatus | 0;
        return message;
    };

    /**
     * Creates a plain object from a Status message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Status
     * @static
     * @param {Status} message Status
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Status.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            object.intStatus = 0;
        if (message.intStatus != null && message.hasOwnProperty("intStatus"))
            object.intStatus = message.intStatus;
        return object;
    };

    /**
     * Converts this Status to JSON.
     * @function toJSON
     * @memberof Status
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Status.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Status;
})();

$root.Gmt = (function() {

    /**
     * Properties of a Gmt.
     * @exports IGmt
     * @interface IGmt
     * @property {number|Long|null} [longGmtDate] Gmt longGmtDate
     */

    /**
     * Constructs a new Gmt.
     * @exports Gmt
     * @classdesc Represents a Gmt.
     * @implements IGmt
     * @constructor
     * @param {IGmt=} [properties] Properties to set
     */
    function Gmt(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Gmt longGmtDate.
     * @member {number|Long} longGmtDate
     * @memberof Gmt
     * @instance
     */
    Gmt.prototype.longGmtDate = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * Creates a new Gmt instance using the specified properties.
     * @function create
     * @memberof Gmt
     * @static
     * @param {IGmt=} [properties] Properties to set
     * @returns {Gmt} Gmt instance
     */
    Gmt.create = function create(properties) {
        return new Gmt(properties);
    };

    /**
     * Encodes the specified Gmt message. Does not implicitly {@link Gmt.verify|verify} messages.
     * @function encode
     * @memberof Gmt
     * @static
     * @param {IGmt} message Gmt message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Gmt.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.longGmtDate != null && message.hasOwnProperty("longGmtDate"))
            writer.uint32(/* id 1, wireType 0 =*/8).int64(message.longGmtDate);
        return writer;
    };

    /**
     * Encodes the specified Gmt message, length delimited. Does not implicitly {@link Gmt.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Gmt
     * @static
     * @param {IGmt} message Gmt message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Gmt.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Gmt message from the specified reader or buffer.
     * @function decode
     * @memberof Gmt
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Gmt} Gmt
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Gmt.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Gmt();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.longGmtDate = reader.int64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Gmt message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Gmt
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Gmt} Gmt
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Gmt.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Gmt message.
     * @function verify
     * @memberof Gmt
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Gmt.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.longGmtDate != null && message.hasOwnProperty("longGmtDate"))
            if (!$util.isInteger(message.longGmtDate) && !(message.longGmtDate && $util.isInteger(message.longGmtDate.low) && $util.isInteger(message.longGmtDate.high)))
                return "longGmtDate: integer|Long expected";
        return null;
    };

    /**
     * Creates a Gmt message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Gmt
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Gmt} Gmt
     */
    Gmt.fromObject = function fromObject(object) {
        if (object instanceof $root.Gmt)
            return object;
        var message = new $root.Gmt();
        if (object.longGmtDate != null)
            if ($util.Long)
                (message.longGmtDate = $util.Long.fromValue(object.longGmtDate)).unsigned = false;
            else if (typeof object.longGmtDate === "string")
                message.longGmtDate = parseInt(object.longGmtDate, 10);
            else if (typeof object.longGmtDate === "number")
                message.longGmtDate = object.longGmtDate;
            else if (typeof object.longGmtDate === "object")
                message.longGmtDate = new $util.LongBits(object.longGmtDate.low >>> 0, object.longGmtDate.high >>> 0).toNumber();
        return message;
    };

    /**
     * Creates a plain object from a Gmt message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Gmt
     * @static
     * @param {Gmt} message Gmt
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Gmt.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults)
            if ($util.Long) {
                var long = new $util.Long(0, 0, false);
                object.longGmtDate = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.longGmtDate = options.longs === String ? "0" : 0;
        if (message.longGmtDate != null && message.hasOwnProperty("longGmtDate"))
            if (typeof message.longGmtDate === "number")
                object.longGmtDate = options.longs === String ? String(message.longGmtDate) : message.longGmtDate;
            else
                object.longGmtDate = options.longs === String ? $util.Long.prototype.toString.call(message.longGmtDate) : options.longs === Number ? new $util.LongBits(message.longGmtDate.low >>> 0, message.longGmtDate.high >>> 0).toNumber() : message.longGmtDate;
        return object;
    };

    /**
     * Converts this Gmt to JSON.
     * @function toJSON
     * @memberof Gmt
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Gmt.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Gmt;
})();

$root.ValList = (function() {

    /**
     * Properties of a ValList.
     * @exports IValList
     * @interface IValList
     * @property {Array.<ValList.IVal_Status_Pair>|null} [listValueStatusPairs] ValList listValueStatusPairs
     */

    /**
     * Constructs a new ValList.
     * @exports ValList
     * @classdesc Represents a ValList.
     * @implements IValList
     * @constructor
     * @param {IValList=} [properties] Properties to set
     */
    function ValList(properties) {
        this.listValueStatusPairs = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * ValList listValueStatusPairs.
     * @member {Array.<ValList.IVal_Status_Pair>} listValueStatusPairs
     * @memberof ValList
     * @instance
     */
    ValList.prototype.listValueStatusPairs = $util.emptyArray;

    /**
     * Creates a new ValList instance using the specified properties.
     * @function create
     * @memberof ValList
     * @static
     * @param {IValList=} [properties] Properties to set
     * @returns {ValList} ValList instance
     */
    ValList.create = function create(properties) {
        return new ValList(properties);
    };

    /**
     * Encodes the specified ValList message. Does not implicitly {@link ValList.verify|verify} messages.
     * @function encode
     * @memberof ValList
     * @static
     * @param {IValList} message ValList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ValList.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.listValueStatusPairs != null && message.listValueStatusPairs.length)
            for (var i = 0; i < message.listValueStatusPairs.length; ++i)
                $root.ValList.Val_Status_Pair.encode(message.listValueStatusPairs[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
        return writer;
    };

    /**
     * Encodes the specified ValList message, length delimited. Does not implicitly {@link ValList.verify|verify} messages.
     * @function encodeDelimited
     * @memberof ValList
     * @static
     * @param {IValList} message ValList message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    ValList.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a ValList message from the specified reader or buffer.
     * @function decode
     * @memberof ValList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {ValList} ValList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ValList.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ValList();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                if (!(message.listValueStatusPairs && message.listValueStatusPairs.length))
                    message.listValueStatusPairs = [];
                message.listValueStatusPairs.push($root.ValList.Val_Status_Pair.decode(reader, reader.uint32()));
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a ValList message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof ValList
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {ValList} ValList
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    ValList.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a ValList message.
     * @function verify
     * @memberof ValList
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    ValList.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.listValueStatusPairs != null && message.hasOwnProperty("listValueStatusPairs")) {
            if (!Array.isArray(message.listValueStatusPairs))
                return "listValueStatusPairs: array expected";
            for (var i = 0; i < message.listValueStatusPairs.length; ++i) {
                var error = $root.ValList.Val_Status_Pair.verify(message.listValueStatusPairs[i]);
                if (error)
                    return "listValueStatusPairs." + error;
            }
        }
        return null;
    };

    /**
     * Creates a ValList message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof ValList
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {ValList} ValList
     */
    ValList.fromObject = function fromObject(object) {
        if (object instanceof $root.ValList)
            return object;
        var message = new $root.ValList();
        if (object.listValueStatusPairs) {
            if (!Array.isArray(object.listValueStatusPairs))
                throw TypeError(".ValList.listValueStatusPairs: array expected");
            message.listValueStatusPairs = [];
            for (var i = 0; i < object.listValueStatusPairs.length; ++i) {
                if (typeof object.listValueStatusPairs[i] !== "object")
                    throw TypeError(".ValList.listValueStatusPairs: object expected");
                message.listValueStatusPairs[i] = $root.ValList.Val_Status_Pair.fromObject(object.listValueStatusPairs[i]);
            }
        }
        return message;
    };

    /**
     * Creates a plain object from a ValList message. Also converts values to other types if specified.
     * @function toObject
     * @memberof ValList
     * @static
     * @param {ValList} message ValList
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    ValList.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.listValueStatusPairs = [];
        if (message.listValueStatusPairs && message.listValueStatusPairs.length) {
            object.listValueStatusPairs = [];
            for (var j = 0; j < message.listValueStatusPairs.length; ++j)
                object.listValueStatusPairs[j] = $root.ValList.Val_Status_Pair.toObject(message.listValueStatusPairs[j], options);
        }
        return object;
    };

    /**
     * Converts this ValList to JSON.
     * @function toJSON
     * @memberof ValList
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    ValList.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    ValList.Val_Status_Pair = (function() {

        /**
         * Properties of a Val_Status_Pair.
         * @memberof ValList
         * @interface IVal_Status_Pair
         * @property {IValue|null} [objValue] Val_Status_Pair objValue
         * @property {IStatus|null} [objStatus] Val_Status_Pair objStatus
         */

        /**
         * Constructs a new Val_Status_Pair.
         * @memberof ValList
         * @classdesc Represents a Val_Status_Pair.
         * @implements IVal_Status_Pair
         * @constructor
         * @param {ValList.IVal_Status_Pair=} [properties] Properties to set
         */
        function Val_Status_Pair(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Val_Status_Pair objValue.
         * @member {IValue|null|undefined} objValue
         * @memberof ValList.Val_Status_Pair
         * @instance
         */
        Val_Status_Pair.prototype.objValue = null;

        /**
         * Val_Status_Pair objStatus.
         * @member {IStatus|null|undefined} objStatus
         * @memberof ValList.Val_Status_Pair
         * @instance
         */
        Val_Status_Pair.prototype.objStatus = null;

        /**
         * Creates a new Val_Status_Pair instance using the specified properties.
         * @function create
         * @memberof ValList.Val_Status_Pair
         * @static
         * @param {ValList.IVal_Status_Pair=} [properties] Properties to set
         * @returns {ValList.Val_Status_Pair} Val_Status_Pair instance
         */
        Val_Status_Pair.create = function create(properties) {
            return new Val_Status_Pair(properties);
        };

        /**
         * Encodes the specified Val_Status_Pair message. Does not implicitly {@link ValList.Val_Status_Pair.verify|verify} messages.
         * @function encode
         * @memberof ValList.Val_Status_Pair
         * @static
         * @param {ValList.IVal_Status_Pair} message Val_Status_Pair message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Val_Status_Pair.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.objValue != null && message.hasOwnProperty("objValue"))
                $root.Value.encode(message.objValue, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.objStatus != null && message.hasOwnProperty("objStatus"))
                $root.Status.encode(message.objStatus, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Val_Status_Pair message, length delimited. Does not implicitly {@link ValList.Val_Status_Pair.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ValList.Val_Status_Pair
         * @static
         * @param {ValList.IVal_Status_Pair} message Val_Status_Pair message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Val_Status_Pair.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Val_Status_Pair message from the specified reader or buffer.
         * @function decode
         * @memberof ValList.Val_Status_Pair
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ValList.Val_Status_Pair} Val_Status_Pair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Val_Status_Pair.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ValList.Val_Status_Pair();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.objValue = $root.Value.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.objStatus = $root.Status.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Val_Status_Pair message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ValList.Val_Status_Pair
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ValList.Val_Status_Pair} Val_Status_Pair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Val_Status_Pair.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Val_Status_Pair message.
         * @function verify
         * @memberof ValList.Val_Status_Pair
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Val_Status_Pair.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.objValue != null && message.hasOwnProperty("objValue")) {
                var error = $root.Value.verify(message.objValue);
                if (error)
                    return "objValue." + error;
            }
            if (message.objStatus != null && message.hasOwnProperty("objStatus")) {
                var error = $root.Status.verify(message.objStatus);
                if (error)
                    return "objStatus." + error;
            }
            return null;
        };

        /**
         * Creates a Val_Status_Pair message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ValList.Val_Status_Pair
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ValList.Val_Status_Pair} Val_Status_Pair
         */
        Val_Status_Pair.fromObject = function fromObject(object) {
            if (object instanceof $root.ValList.Val_Status_Pair)
                return object;
            var message = new $root.ValList.Val_Status_Pair();
            if (object.objValue != null) {
                if (typeof object.objValue !== "object")
                    throw TypeError(".ValList.Val_Status_Pair.objValue: object expected");
                message.objValue = $root.Value.fromObject(object.objValue);
            }
            if (object.objStatus != null) {
                if (typeof object.objStatus !== "object")
                    throw TypeError(".ValList.Val_Status_Pair.objStatus: object expected");
                message.objStatus = $root.Status.fromObject(object.objStatus);
            }
            return message;
        };

        /**
         * Creates a plain object from a Val_Status_Pair message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ValList.Val_Status_Pair
         * @static
         * @param {ValList.Val_Status_Pair} message Val_Status_Pair
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Val_Status_Pair.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.objValue = null;
                object.objStatus = null;
            }
            if (message.objValue != null && message.hasOwnProperty("objValue"))
                object.objValue = $root.Value.toObject(message.objValue, options);
            if (message.objStatus != null && message.hasOwnProperty("objStatus"))
                object.objStatus = $root.Status.toObject(message.objStatus, options);
            return object;
        };

        /**
         * Converts this Val_Status_Pair to JSON.
         * @function toJSON
         * @memberof ValList.Val_Status_Pair
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Val_Status_Pair.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Val_Status_Pair;
    })();

    return ValList;
})();

module.exports = $root;
