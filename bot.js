const Telegram = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

const botToken = "5757676598:AAFmy8FpmZgb6SWS6-62GuMoWNI9Ew83T8U";
const openaiToken = "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";

const config = new Configuration({
  apiKey: openaiToken,
});

const openai = new OpenAIApi(config);

const bot = new Telegram(botToken, { polling: true });

// Provide more comprehensive training data to the OpenAI model by using larger and more diverse datasets.
// This will help the model better understand natural language and generate more accurate responses.
const model = "text-davinci-002";

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Hi ${msg.chat.first_name}, welcome to the AI ChatBot!`);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  // Increase the max_tokens parameter to generate longer responses.
  const maxTokens = 200;

  // Adjust the temperature parameter to control the creativity of the responses.
  const temperature = 0.5;

  // Add more context to the prompts to provide the model with additional information.
  const prompt = `User: ${msg.text}\nBot:`;

  const reply = await openai.createCompletion({
    model: model,
    prompt: prompt,
    temperature: temperature,
    max_tokens: maxTokens,
  });

  bot.sendMessage(chatId, reply.data.choices[0].text);
});
