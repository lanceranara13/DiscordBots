import os
import discord
from discord.ext import commands
from discord import app_commands

TOKEN = os.getenv("DISCORD_TOKEN")
if not TOKEN:
    raise RuntimeError("DISCORD_TOKEN is not set")

intents = discord.Intents.default()
intents.message_content = True

class MyBot(commands.Bot):
    def __init__(self):
        super().__init__(command_prefix="!", intents=intents)

    async def setup_hook(self):
        await self.tree.sync()
        print("✅ Slash commands synced")

bot = MyBot()

@bot.event
async def on_ready():
    activity = discord.Game(name="!ping | Service Working Docker")
    await bot.change_presence(status=discord.Status.online, activity=activity)
    print(f"✅ Logged in as {bot.user}")

# ---------- PREFIX COMMAND ----------
@bot.command()
async def ping(ctx):
    await ctx.send("Pong! 🏓 (prefix)")

# ---------- SLASH COMMAND ----------
@bot.tree.command(name="ping", description="Check if the bot is alive")
async def slash_ping(interaction: discord.Interaction):
    await interaction.response.send_message("Pong! 🏓 (slash)")

bot.run(TOKEN)
