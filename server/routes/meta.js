const bizSdk = require("facebook-nodejs-business-sdk");
const Content = bizSdk.Content;
const CustomData = bizSdk.CustomData;
const DeliveryCategory = bizSdk.DeliveryCategory;
const EventRequest = bizSdk.EventRequest;
const UserData = bizSdk.UserData;
const ServerEvent = bizSdk.ServerEvent;
const access_token = process.env.META_TOKEN;
const pixel_id = process.env.META_PIXEL;
const api = bizSdk.FacebookAdsApi.init(access_token);
const express = require("express");
const router = express.Router();

router.post("/event", async (request, response) => {
  try {
    let current_timestamp = Math.floor(new Date() / 1000);
    const { data } = request.body;
    const { event_name, event_source_url, event_id, user_data, custom_data } =
      data[0];

    console.log("data!@", data[0]);
    const userData = new UserData()
      .setEmails([...user_data.em])
      .setPhones([...user_data.ph])
      // It is recommended to send Client IP and User Agent for Conversions API Events.
      .setClientIpAddress(request.connection.remoteAddress)
      .setClientUserAgent(request.headers["user-agent"])
      .setFbp("fb.1.1558571054389.1098115397")
      .setFbc("fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890");

    const content = new Content()
      .setId(custom_data.content_name)
      .setQuantity(1)
      .setDeliveryCategory(DeliveryCategory.HOME_DELIVERY);

    const customData = new CustomData()
      .setContents([content])
      .setCurrency("usd")
      .setValue(custom_data.value);

    const serverEvent = new ServerEvent()
      .setEventName(event_name)
      .setEventTime(current_timestamp)
      .setUserData(userData)
      .setCustomData(customData)
      .setEventSourceUrl(event_source_url)
      .setEventId(event_id)
      .setActionSource("website");

    const eventsData = [serverEvent];

    const eventRequest = new EventRequest(
      access_token,
      pixel_id,
      null,
      null,
      "TEST99866"
    ).setEvents(eventsData);

    const evtReq = await eventRequest.execute();

    console.log("evt req", evtReq);

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ success: false });
  }
});

module.exports = router;
