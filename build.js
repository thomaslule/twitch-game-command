const { spawn } = require("child_process");
const { promises, constants } = require("fs");

const npm = /^win/.test(process.platform) ? "npm.cmd" : "npm";

async function build() {
  await execute(npm, ["install"], "frontend");
  await execute(npm, ["run", "build"], "frontend");
  await execute(npm, ["install"], "backend");
  await execute(npm, ["run", "build"], "backend");
  await mvdir("frontend/dist", "backend/public");
  await cp("backend/.env.template", "backend/.env");
  console.log("Build successful!");
}

async function execute(command, args = [], cwd = null) {
  console.log(`>${cwd || "."} ${command} ${args.join(" ")}`);
  const process = spawn(command, args, { cwd });
  process.stdout.on("data", (data) => {
    console.log(data.toString());
  });
  process.stderr.on("data", (data) => {
    console.error(data.toString());
  });
  return new Promise((resolve, reject) => {
    process.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  });
}

async function mvdir(from, to) {
  console.log(`>rmdir ${to}`);
  await promises.rmdir(to, { recursive: true });
  console.log(`>rename ${from} ${to}`);
  await promises.rename(from, to);
}

async function cp(from, to) {
  try {
    console.log(`>copyFile ${from} ${to}`);
    await promises.copyFile(from, to, constants.COPYFILE_EXCL);
  } catch (err) {
    console.log(`${to} already exists`);
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
