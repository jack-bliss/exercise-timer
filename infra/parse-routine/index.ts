import { program } from 'commander';
import { getFromLocal } from '../../src/server/services/get-asset/get-from-local';
import { parseRoutine } from './service';
import { saveToLocal } from '../../src/server/services/save-asset/save-to-local';
import { saveToBucket } from '../../src/server/services/save-asset/save-to-bucket';

program.requiredOption(
  '-n, --name <name>',
  'File name to parse inside routines folder (e.g., "squats")',
);

program.parse();

const { name } = program.opts() as {
  name: string;
};

console.info({ name });

async function main() {
  const content = await getFromLocal(`./routines/${name}.txt`);
  const parsed = parseRoutine(name, content.toString());
  const buffer = Buffer.from(JSON.stringify(parsed, null, 2));
  const destination = `routines/${name}.json`;
  await Promise.all([
    saveToLocal(destination, buffer),
    saveToBucket(destination, buffer),
  ]);
}

main()
  .then(() => console.info('done!'))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
