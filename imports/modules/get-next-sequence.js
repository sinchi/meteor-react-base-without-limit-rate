import { Sequence } from "../api/sequences/sequence.js";
import { sequenceInc } from "../api/sequences/methods.js";

export const getNextSequence = function (name) {
     sequenceInc.call({name: name}, (error) => {
       if(error)
        return error.reason;
        else {
          return "update succes";
        }
     });
};
