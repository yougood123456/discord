const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const {
  TwoZeroFourEight,
  Minesweeper,
  Snake,
  Hangman,
  TicTacToe,
  Wordle,
} = require("discord-gamecord");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("minigame")
    .setDescription("Starts a minigame.")
    .setDMPermission(false)
    .addSubcommand((command) =>
      command
        .setName("8ball")
        .setDescription("Asks 8 ball a question.")
        .addStringOption((option) =>
          option
            .setName("question")
            .setDescription("What is your question to 8 ball?")
            .setRequired(true)
            .setMaxLength(200)
        )
    )
    .addSubcommand((command) =>
      command.setName("2048").setDescription("Start a game of 2048.")
    )
    .addSubcommand((command) =>
      command
        .setName("minesweeper")
        .setDescription("Starts a game of minesweeper.")
    )
    .addSubcommand((command) =>
      command.setName("snake").setDescription("Starts a game of snake.")
    )
    .addSubcommand((command) =>
      command.setName("hangman").setDescription("Starts a game of hangman.")
    )
    .addSubcommand((command) =>
      command
        .setName("tic-tac-toe")
        .setDescription("Starts a game of tic-tac-toe.")
        .addUserOption((option) =>
          option
            .setName("opponent")
            .setDescription("Select your opponent.")
            .setRequired(true)
        )
    )
    .addSubcommand((command) =>
      command.setName("wordle").setDescription("Starts a game of worlde.")
    )
    .addSubcommand((command) =>
      command
        .setName("would-you-rather")
        .setDescription("Start a game of would you rather.")
    ),
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    switch (sub) {
      case "8ball":
        const question = interaction.options.getString("question");
        const choice = [
          "It is certain.",
          "It is decidedly so.",
          "Without a doubt.",
          "Yes definitely.",
          "You may rely on it.",
          "As I see it, yes.",
          "Most likely.",
          "Outlook good.",
          "Yes.",
          "Signs point to yes.",
          "Reply hazy, try again.",
          "Ask again later.",
          "Better not tell you now.",
          "Cannot predict now.",
          "Concentrate and ask again.",
          "Don't count on it.",
          "My reply is no.",
          "My sources say no.",
          "Outlook not so good.",
          "Very doubtful.",
        ];
        const ball = Math.floor(Math.random() * choice.length);

        const embed = new EmbedBuilder()
          .setColor("Blue")
          .setDescription(
            `🎱 Press the button to roll the 8 ball.\n\❓ Question: **"${question}"**`
          );

        const embed2 = new EmbedBuilder()
          .setColor("Blue")
          .setDescription(
            `\❓ Question: **"${question}"**\n\🎱 Answer: **${choice[ball]}**`
          );

        const button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("button")
            .setLabel("Roll")
            .setEmoji("🎱")
            .setStyle(ButtonStyle.Primary)
        );

        const msg = await interaction.reply({
          embeds: [embed],
          components: [button],
        });
        const collector = msg.createMessageComponentCollector();

        collector.on("collect", async (i) => {
          if (i.customId == "button") {
            i.update({ embeds: [embed2], components: [] });
          }
        });

        break;
      case "2048":
        const Game = new TwoZeroFourEight({
          message: interaction,
          embed: {
            title: "2048",
            color: "Blue",
          },
          emojis: {
            up: "⬆️",
            down: "⬇️",
            left: "⬅️",
            right: "➡️",
          },
          timeoutTime: 60000,
          buttonStyle: "SUCCESS",
          playerOnlyMessage: "Run your own game of 2048 with `/minigame 2048`.",
        });

        Game.startGame();
        Game.on("gameOver", (result) => {
          return;
        });

        break;
      case "minesweeper":
        const Game1 = new Minesweeper({
          message: interaction,
          embed: {
            title: "Minesweeper",
            color: "Blue",
          },
          emojis: { flag: "🚩", mine: "💣" },
          mines: 5,
          timeoutTime: 60000,
          winMessage: "You won the Game!",
          loseMessage: "Game Over! Better luck next time.",
          playerOnlyMessage:
            "Run your own game of minesweeper with `/minigame minesweeper`.",
        });

        Game1.startGame();
        Game1.on("gameOver", (result) => {
          return;
        });

        break;
      case "snake":
        const Game2 = new Snake({
          message: interaction,
          embed: {
            title: "Snake",
            overTitle: "Game Over",
            color: "Blue",
          },
          emojis: {
            food: "🍎",
            up: "⬆️",
            down: "⬇️",
            left: "⬅️",
            right: "➡️",
          },
          snake: { head: "🟢", body: "🟩", tail: "🟢", over: "💀" },
          foods: ["🍎", "🍇", "🍊", "🫐", "🥕", "🥝", "🌽"],
          stopButton: "Stop",
          timeoutTime: 60000,
          playerOnlyMessage:
            "Run your own game of snake with `/minigame snake`.",
        });

        Game2.startGame();
        Game2.on("gameOver", (result) => {
          return;
        });

        break;
      case "hangman":
        const Game3 = new Hangman({
          message: interaction,
          embed: {
            title: `Hangman`,
            color: "Blue",
          },
          hangman: {
            hat: "🎩",
            head: "😟",
            shirt: "👕",
            pants: "👖",
            boots: "🥾🥾",
          },
          timeoutTime: 60000,
          themeWords: "all",
          winMessage: "You won the game! The word was **{word}**",
          loseMessage: "Game Over! The word was **{word}**",
          playerOnlyMessage:
            "Run your own game of hangman with `/minigame hangman`",
        });

        Game3.startGame();
        Game3.on("gameOver", (result) => {
          return;
        });

        break;
      case "tic-tac-toe":
        const enemy = interaction.options.getUser("opponent");
        const redembed = new EmbedBuilder().setColor("Red");
        if (interaction.user.id === enemy.id)
          return await interaction.reply({
            embeds: [
              redembed.setDescription(
                `<:cross:1082334173915775046> You cannot play Tic Tac Toe with yourself.`
              ),
            ],
            ephemeral: true,
          });
        if (enemy.bot)
          return await interaction.reply({
            embeds: [
              redembed.setDescription(
                `<:cross:1082334173915775046> You cannot play Tic Tac Toe with bots.`
              ),
            ],
            ephemeral: true,
          });

        const game = new TicTacToe({
          message: interaction,
          isSlashGame: true,
          opponent: interaction.options.getUser("opponent"),

          embed: {
            title: "Tic Tac Toe",
            color: "Blue",
            statusTitle: "Status",
            overTitle: "Game Over!",
          },

          emojis: {
            xButton: "❌",
            oButton: "🔵",
            blankButton: "➖",
          },

          mentionUser: true,
          timeoutTime: 120000,
          xButtonStyle: "DANGER",
          oButtonStyle: "PRIMARY",
          turnMessage: "**{player}**, it is your turn.",
          winMessage: "**{player}** won the game!",
          tieMessage: "The game was a tie!",
          timeoutMessage: "The game was draw due to inactivity!",
          playerOnlyMessage:
            "Run your own game of Tic Tac Toe with `/minigame tic-tac-toe`.",
        });

        try {
          await game.startGame();
        } catch (err) {
          await interaction.reply({
            embeds: [
              redembed.setDescription(
                `<:cross:1082334173915775046> Unable to start the game.`
              ),
            ],
            ephemeral: true,
          });
        }

        game.on("gameOver", (result) => {
          return;
        });

        break;
      case "wordle":
        const Game4 = new Wordle({
          message: interaction,
          isSlashGame: false,
          embed: {
            title: "Wordle",
            color: "Blue",
          },
          customword: null,
          timeoutTime: 120000,
          winMessage: `You won the game! The word was: **{word}**`,
          loseMessage: `Game Over! The word was: **{word}**`,
          playerOnlyMessage:
            "Run your own game of worlde with `/minigame wordle`.",
        });

        Game4.startGame();
        Game4.on("gameOver", (result) => {
          return;
        });

        break;
      case "would-you-rather":
        const questions = [
          "Would you rather eat a bug or a fly?",
          "Would you rather lick the floor or a broom?",
          "Would you rather eat ice cream or cake?",
          "Would you rather clean a toliet or a babys diaper",
          "Would you rather lick your keyboard or mouse?",
          "Would you rather wash your hair with mash potatoes or cranberry sauce?",
          "Would you rather team up with Wonder Woman or Captain Marvel?",
          "Would you rather want to find true love or win lottery next month?",
          "Would you rather be forced to sing along or dance to every song you hear?",
          "Would you rather have everyone you know be able to read your thoughts or for everyone you know to have access to your Internet history?",
          "Would you rather be chronically under-dressed or overdressed?",
          "Would you rather lose your sight or your memories?",
          "Would you rather have universal respect or unlimited power?",
          "Would you rather give up air conditioning and heating for the rest of your life or give up the Internet for the rest of your life?",
          "Would you rather swim in a pool full of Nutella or a pool full of maple syrup?",
          "Would you rather labor under a hot sun or extreme cold?",
          "Would you rather stay in during a snow day or build a fort?",
          "Would you rather buy 10 things you don’t need every time you go shopping or always forget the one thing that you need when you go to the store?",
          "Would you rather never be able to go out during the day or never be able to go out at night?",
          "Would you rather have a personal maid or a personal chef?",
          "Would you rather have beyoncé’s talent or Jay-Z‘s business acumen?",
          "Would you rather be an extra in an Oscar-winning movie or the lead in a box office bomb?",
          "Would you rather vomit on your hero or have your hero vomit on you?",
          "Would you rather communicate only in emoji or never be able to text at all ever again?",
          "Would you rather be royalty 1,000 years ago or an average person today?",
          "Would you rather lounge by the pool or on the beach?",
          "Would you rather wear the same socks for a month or the same underwear for a week?",
          "Would you rather work an overtime shift with your annoying boss or spend full day with your mother-in-law?",
          "Would you rather cuddle a koala or pal around with a panda?",
          "Would you rather have a sing-off with Ariana Grande or a dance-off with Rihanna?",
          "Would you rather watch nothing but Hallmark Christmas movies or nothing but horror movies?",
          "Would you rather always be 10 minutes late or always be 20 minutes early?",
          "Would you rather have a pause or a rewind button in your life?",
          "Would you rather lose all your teeth or lose a day of your life every time you kissed someone?",
          "Would you rather drink from a toilet or pee in a litter box?",
          "Would you rather be forced to live the same day over and over again for a full year, or take 3 years off the end of your life?",
          "Would you rather never eat watermelon ever again or be forced to eat watermelon with every meal?",
          "Would you rather go to Harvard but graduate and be jobless, or graduate from another college and work for Harvard",
          "Would you rather the aliens that make first contact be robotic or organic?",
          "Would you rather lose the ability to read or lose the ability to speak?",
          "Would you rather have a golden voice or a silver tongue?",
          "Would you rather be covered in fur or covered in scales?",
          "Would you rather be in jail for a year or lose a year off your life?",
          "Would you rather have one real get out of jail free card or a key that opens any door?",
          "Would you rather know the history of every object you touched or be able to talk to animals?",
          "Would you rather be married to a 10 with a bad personality or a 6 with an amazing personality?",
          "Would you rather be able to talk to land animals, animals that fly, or animals that live under the water?",
          "Would you rather have all traffic lights you approach be green or never have to stand in line again?",
          "Would you rather spend the rest of your life with a sailboat as your home or an RV as your home?",
          "Would you rather marry someone pretty but stupid or clever but ugly?",
          "Would you rather give up all drinks except for water or give up eating anything that was cooked in an oven?",
          "Would you rather be able to see 10 minutes into your own future or 10 minutes into the future of anyone but yourself?",
          "Would you rather have to fart loudly every time you have a serious conversation or have to burp after every kiss?",
          "Would you rather become twice as strong when both of your fingers are stuck in your ears or crawl twice as fast as you can run?",
          "Would you rather have everything you draw become real but be permanently terrible at drawing or be able to fly but only as fast as you can walk?",
          "Would you rather thirty butterflies instantly appear from nowhere every time you sneeze or one very angry squirrel appear from nowhere every time you cough?",
          "Would you rather vomit uncontrollably for one minute every time you hear the happy birthday song or get a headache that lasts for the rest of the day every time you see a bird (including in pictures or a video)?",
          "Would you rather eat a sandwich made from 4 ingredients in your fridge chosen at random or eat a sandwich made by a group of your friends from 4 ingredients in your fridge?",
          "Would you rather everyone be required to wear identical silver jumpsuits or any time two people meet and are wearing an identical article of clothing they must fight to the death?",
          "Would you rather have to read aloud every word you read or sing everything you say out loud?",
          "Would you rather wear a wedding dress/tuxedo every single day or wear a bathing suit every single day?",
          "Would you rather be unable to move your body every time it rains or not be able to stop moving while the sun is out?",
          "Would you rather have all dogs try to attack you when they see you or all birds try to attack you when they see you?",
          "Would you rather be compelled to high five everyone you meet or be compelled to give wedgies to anyone in a green shirt?",
          "Would you rather have skin that changes color based on your emotions or tattoos appear all over your body depicting what you did yesterday?",
          "Would you rather randomly time travel +/- 20 years every time you fart or teleport to a different place on earth (on land, not water) every time you sneeze?",
          "Would you rather there be a perpetual water balloon war going on in your city/town or a perpetual food fight?",
          "Would you rather have a dog with a cat’s personality or a cat with a dog’s personality?",
          "If you were reborn in a new life, would you rather be alive in the past or future?",
          "Would you rather eat no candy at Halloween or no turkey at Thanksgiving?",
          "Would you rather date someone you love or date someone who loves you?",
          "Would you rather lose the ability to lie or believe everything you’re told?",
          "Would you rather be free or be totally safe?",
          "Would you rather eat poop that tasted like chocolate, or eat chocolate that tasted like crap?",
          "Would you rather Look 10 years older from the neck up, or the neck down?",
          "Would you rather be extremely underweight or extremely overweight?",
          "Would you rather Experience the beginning of planet earth or the end of planet earth?",
          "Would you rather have three kids and no money, or no kids with three million dollars?",
          "Would you rather be the funniest person in the room or the most intelligent?",
          "Would you rather have a Lamborghini in your garage or a bookcase with 9000 books and infinite knowledge?",
          "Would you rather Reverse one decision you make every day or be able to stop time for 10 seconds every day?",
          "Would you rather win $50,000 or let your best friend win $500,000?",
          "Would you rather Run at 100 mph or fly at ten mph?",
          "Would you rather Continue with your life or restart it?",
          "Would you rather be able to talk your way out of any situation, or punch your way out of any situation?",
          "Would you rather have free Wi-Fi wherever you go or have free coffee where/whenever you want?",
          "Would you rather have seven fingers on each hand or have seven toes on each foot?",
          "Would you rather live low life with your loved one or rich life all alone?",
          "Would you rather have no one to show up for your wedding or your funeral?",
          "Would you rather Rule the world or live in a world with absolutely no problems at all?",
          "Would you rather go back to the past and meet your loved ones who passed away or go to the future to meet your children or grandchildren to be?",
          "Would you rather Speak your mind or never speak again?",
          "Would you rather live the life of a king with no family or friends or live like a vagabond with your friends or family?",
          "Would you rather know how you will die or when you will die?",
          "Would you rather Speak all languages or be able to speak to all animals?",
          "Would you rather get away with lying every time or always know that someone is lying?",
          "Would you rather Eat your dead friend or kill your dog and eat it when you are marooned on a lonely island?",
          "Would you rather have a billion dollars to your name or spend $1000 for each hungry and homeless person?",
          "Would you rather end death due to car accidents or end terrorism?",
          "Would you rather end the life a single human being or 100 cute baby animals?",
          "Would you rather end hunger or end your hunger?",
          "Would you rather give up your love life or work life?",
          "Would you rather live in an amusement park or a zoo?",
          "Would you rather be a millionaire by winning the lottery or by working 100 hours a week?",
          "Would you rather read minds or accurately predict future?",
          "Would you rather eat only pizza for 1 year or eat no pizza for 1 year?",
          "Would you rather visit 100 years in the past or 100 years in the future?",
          "Would you rather be invisible or be fast?",
          "Would you rather Look like a fish or smell like a fish?",
          "Would you rather Play on Minecraft or play FIFA?",
          "Would you rather Fight 100 duck-sized horses or 1 horse-sized duck?",
          "Would you rather have a grapefruit-sized head or a head the size of a watermelon?",
          "Would you rather be a tree or have to live in a tree for the rest of your life?",
          "Would you rather live in space or under the sea?",
          "Would you rather lose your sense of touch or your sense of smell?",
          "Would you rather be Donald Trump or George Bush?",
          "Would you rather have no hair or be completely hairy?",
          "Would you rather wake up in the morning looking like a giraffe or a kangaroo?",
          "Would you rather have a booger hanging from your nose for the rest of your life or earwax planted on your earlobes?",
          "Would you rather have a sumo wrestler on top of you or yourself on top of him?",
        ];
        const randomize =
          questions[Math.floor(Math.random() * questions.length)];

        const embed3 = new EmbedBuilder()
          .setDescription(`${randomize}`)
          .setColor("Blue");

        const embed1 = new EmbedBuilder()
          .setDescription(`${randomize}\n\n You chose **option 1**`)
          .setColor("Blue");

        const embed5 = new EmbedBuilder()
          .setDescription(`${randomize}\n\n You chose **option 2**`)
          .setColor("Blue");

        const button1 = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("option1")
            .setLabel("1️⃣")
            .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
            .setCustomId("option2")
            .setLabel("2️⃣")
            .setStyle(ButtonStyle.Primary)
        );

        const restart = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("wyr-restart")
            .setLabel("🔃 Restart")
            .setStyle(ButtonStyle.Success)
        );

        const message = await interaction.reply({
          embeds: [embed3],
          components: [button1],
        });
        const collector1 = await message.createMessageComponentCollector();
        collector1.on("collect", async (i) => {
          if (i.customId === "option1") {
            if (i.user.id !== interaction.user.id) {
              return await i.reply({
                content:
                  "Run your own game of would you rather with `/minigame would-you-rather`.",
                ephemeral: true,
              });
            }
            await i.update({ embeds: [embed1], components: [restart] });
          }

          if (i.customId === "option2") {
            if (i.user.id !== interaction.user.id) {
              return await i.reply({
                content:
                  "Run your own game of would you rather with `/minigame would-you-rather`.",
                ephemeral: true,
              });
            }
            await i.update({ embeds: [embed5], components: [restart] });
          }

          if (i.customId === "wyr-restart") {
            if (i.user.id !== interaction.user.id) {
              return await i.reply({
                content:
                  "Run your own game of would you rather with `/minigame would-you-rather`.",
                ephemeral: true,
              });
            }
            let res =
              questions[Math.floor(Math.random() * questions.length)];

              const rstart = new EmbedBuilder()
              .setDescription(`${res}`)
              .setColor("Blue");
              
            await i.update({ embeds: [rstart], components: [button1] });
          }
        });
    }
  },
};
