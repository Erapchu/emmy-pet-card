async function loadData() {
  const response = await fetch('data.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Не удалось загрузить data.json');
  const data = await response.json();

  const fields = ['name', 'subtitle', 'status', 'birthDate', 'weight', 'color', 'features', 'temperament', 'health', 'reward', 'city', 'updated'];
  for (const field of fields) {
    const element = document.getElementById(field);
    if (element && data[field]) element.textContent = data[field];
  }

  document.title = `${data.name || 'Питомец'} — карточка питомца`;

  const callButton = document.getElementById('callButton');
  callButton.href = `tel:${data.phoneHref}`;
  callButton.textContent = `Позвонить: ${data.phoneDisplay}`;

  const telegramButton = document.getElementById('telegramButton');
  telegramButton.href = data.telegram;
  telegramButton.hidden = !data.telegram;

  const whatsappButton = document.getElementById('whatsappButton');
  whatsappButton.href = data.whatsapp;
  whatsappButton.hidden = !data.whatsapp;
}

loadData().catch(error => {
  console.error(error);
  const status = document.getElementById('status');
  if (status) status.textContent = 'Информация временно недоступна. Пожалуйста, позвоните по номеру на жетоне.';
});
