import httpService from "./httpService";

/**
 * @typedef {Object} ContactFormPayload
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} message
 */

class ContactService {
  /**
   * @param {ContactFormPayload} payload
   */
  submit(payload) {
    return httpService.post("/contact/create", payload);
  }

  getAll() {
    return httpService.get("/contact");
  }
}

export default new ContactService();
