"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Copyright 2016-2019 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMessage = exports.updateContext = exports.readContext = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debug = require('debug')('watson-middleware:utils');
const storagePrefix = 'user.';
function readContext(userId, storage) {
    return __awaiter(this, void 0, void 0, function* () {
        const itemId = storagePrefix + userId;
        try {
            const result = yield storage.read([itemId]);
            if (typeof result[itemId] !== 'undefined' && result[itemId].context) {
                debug('User: %s, Context: %s', userId, JSON.stringify(result[itemId].context, null, 2));
                return result[itemId].context;
            }
        }
        catch (err) {
            debug('User: %s, read context error: %s', userId, err);
        }
        return null;
    });
}
exports.readContext = readContext;
function updateContext(userId, storage, watsonResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        const itemId = storagePrefix + userId;
        let userData = {};
        try {
            const result = yield storage.read([itemId]);
            if (typeof result[itemId] !== 'undefined') {
                debug('User: %s, Data: %s', userId, JSON.stringify(result[itemId], null, 2));
                userData = result[itemId];
            }
        }
        catch (err) {
            debug('User: %s, read context error: %s', userId, err);
        }
        userData.id = userId;
        userData.context = watsonResponse.context;
        const changes = {};
        changes[itemId] = userData;
        yield storage.write(changes);
        return watsonResponse;
    });
}
exports.updateContext = updateContext;
function postMessage(conversation, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        debug('Assistant Request: %s', JSON.stringify(payload, null, 2));
        const response = yield conversation.message(payload);
        debug('Assistant Response: %s', JSON.stringify(response, null, 2));
        return response.result;
    });
}
exports.postMessage = postMessage;
//# sourceMappingURL=utils.js.map