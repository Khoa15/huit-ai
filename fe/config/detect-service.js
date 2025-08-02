import fetch from "node-fetch";
import SYSTEM_CONSTANTS from "./constants"

import { URL_DETECT } from "./config";

export default class DetectServiceAPI {
    static host = URL_DETECT;

    static async detectImage(base64string, width, height) {
        const fromData = {
            base64_str: base64string,
            size_device: [width, height]
        }
        const res = await fetch(`${DetectServiceAPI.host}/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fromData)
        }).catch(function(err){
            throw err
        });
        if(res.ok){
            let data = await res.json();
            return data;
        }
    }
}