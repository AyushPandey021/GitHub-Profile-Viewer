const input = document.querySelector('.usernameinp');
const button = document.querySelector('.Search');
const profileCard = document.getElementById('profileData');
const loading = document.getElementById('loading');

const renderProfile = (data) => {
  profileCard.innerHTML = `
    <div class="flex gap-4 items-center">
      <img
        src="${data.avatar_url}"
        alt="Avatar"
        class="w-20 h-20 rounded-full border-2 border-white shadow-lg"
      />
      <div>
        <h2 class="text-2xl font-bold">${data.name || data.login}</h2>
        <p class="text-sm text-white/70">${data.bio || 'No bio available.'}</p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-6 text-sm">
      <div><strong>Followers:</strong> ${data.followers}</div>
      <div><strong>Following:</strong> ${data.following}</div>
      <div><strong>Public Repos:</strong> ${data.public_repos}</div>
      <div><strong>Location:</strong> ${data.location || 'Not available'}</div>
    </div>

    <div class="mt-6 space-y-2 text-sm text-white/80">
      <div><strong>Company:</strong> ${data.company || 'Not available'}</div>
      <div>
        <strong>Blog:</strong>
        <a
          href="${data.blog || '#'}"
          class="text-indigo-400 hover:underline"
          target="_blank"
        >${data.blog || 'N/A'}</a>
      </div>
      <div>
        <strong>GitHub Profile:</strong>
        <a
          href="${data.html_url}"
          class="text-indigo-400 hover:underline"
          target="_blank"
        >${data.html_url}</a>
      </div>
    </div>
  `;
};

const showError = (message) => {
  profileCard.innerHTML = `
    <div class="text-red-400 font-semibold mt-6 text-center">${message}</div>
  `;
};

button.addEventListener('click', async () => {
  const username = input.value.trim();
  if (!username) {
    alert('Please enter a GitHub username');
    return;
  }

  loading.classList.remove('hidden');
  profileCard.innerHTML = ''; // clear old data

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) throw new Error('User not found');
    const data = await res.json();
    renderProfile(data);
  } catch (err) {
    showError(err.message);
  } finally {
    loading.classList.add('hidden');
  }
});
