const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig().then(createWindowsInstaller).catch((error) => {
	console.error(error.message || error);
	process.exit(1);
});

function getInstallerConfig() {
	console.log('creating windows installer');
	const rootPath = path.join('./');
	const outPath = path.join(rootPath, 'release-builds');

	return Promise.resolve({
		appDirectory: path.join(outPath, 'G3TBilling-win32-ia32/'),
		authors: 'MH KHAN',
		noMsi: true,
		name: 'G3TBilling',
		description: 'G3T Billing App',
		loadingGif: path.join(rootPath, 'assets', 'img', 'loading.gif'),
		outputDirectory: path.join(outPath, 'windows-installer'),
		exe: 'G3TBilling.exe',
		setupExe: 'G3TBilling-Installer.exe',
		setupMsi: 'G3TBilling-Installer.msi',
		setupIcon: path.join(rootPath, 'assets', 'app-icon', 'win', 'g3t.ico')
	});
}