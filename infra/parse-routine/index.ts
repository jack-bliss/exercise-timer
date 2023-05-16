import { program } from 'commander';
import { writeFile } from 'fs/promises';
import { getFromLocal } from '../../src/server/services/get-asset/get-from-local';
import { parseRoutine } from './service';

program.requiredOption(
  '--name <name>',
  'File name to parse inside routines folder',
);

program.parse();

const { name } = program.opts() as {
  name: string;
};

console.info({ name });

async function main() {
  const content = await getFromLocal(`./routines/${name}.txt`);
  const parsed = parseRoutine(name, content.toString());
  await writeFile(
    `./bucket/routines/${name}.json`,
    JSON.stringify(parsed, null, 2),
  );
}

main()
  .then(() => console.info('done!'))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
