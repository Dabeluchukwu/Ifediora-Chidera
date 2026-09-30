export async function notifySheSaidYes() {
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("⚠️ No Discord webhook URL found in .env.local");
    return;
  }

  const now = new Date();
  const timeString = now.toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "short",
  });

  const payload = {
    username: "Mami's Birthday Site 💙",
    avatar_url:
      "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    embeds: [
      {
        title: "💙 SHE SAID YES! 💙",
        description:
          "**Mami officially said yes!** 🎉\n\nGo celebrate, you lucky man. 🌹",
        color: 0x3b82f6,
        fields: [
          {
            name: "⏰ Time",
            value: timeString,
            inline: false,
          },
          {
            name: "💌 Answer",
            value: "**YES** 💙",
            inline: true,
          },
          {
            name: "🌸 Her",
            value: "Ifediora Peculiar Chidera (Mami)",
            inline: true,
          },
        ],
        footer: {
          text: "Made with love, just for her 💙",
        },
        timestamp: now.toISOString(),
      },
    ],
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Discord webhook failed:", res.status);
    } else {
      console.log("✅ Discord notified!");
    }
  } catch (err) {
    console.error("Discord webhook error:", err);
  }
}