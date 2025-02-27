<script setup lang="ts"></script>

<template>
  <div id="card" class="pb-12 border-t border-gray-200 pt-12">
    <h3 class="text-2xl font-bold text-gray-900">Card</h3>
    <p class="mt-2 text-gray-600">
      Komponen card untuk menampilkan konten dalam container yang terisolasi.
    </p>

    <!-- Example -->
    <div class="mt-6 bg-white p-6 rounded-lg shadow-md">
      <h4 class="text-lg font-medium text-gray-900">Contoh</h4>
      <div class="mt-4">
        <div class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <div class="p-5">
            <h5 class="text-xl font-semibold text-gray-900 mb-2">Card Title</h5>
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
            </p>
            <div class="mt-4">
              <button class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900">Penggunaan</h4>
      <div class="mt-4 bg-gray-800 rounded-md p-4">
        <pre class="text-gray-200 overflow-x-auto">
<code>&lt;Card
  title="Card Title"
  :has-shadow="true"
&gt;
  &lt;template #content&gt;
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  &lt;/template&gt;
  &lt;template #footer&gt;
    &lt;Button variant="primary"&gt;Read More&lt;/Button&gt;
  &lt;/template&gt;
&lt;/Card&gt;</code>
                </pre>
      </div>
    </div>

    <!-- Props -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900">Props</h4>
      <div class="mt-4 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tipe
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Default
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Deskripsi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">title</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">String</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">''</td>
              <td class="px-6 py-4 text-sm text-gray-500">Judul card</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                hasShadow
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Boolean</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">true</td>
              <td class="px-6 py-4 text-sm text-gray-500">Apakah card memiliki shadow</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Slots -->
    <div class="mt-6">
      <h4 class="text-lg font-medium text-gray-900">Slots</h4>
      <div class="mt-4 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Deskripsi
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">default</td>
              <td class="px-6 py-4 text-sm text-gray-500">Konten utama card</td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">header</td>
              <td class="px-6 py-4 text-sm text-gray-500">
                Bagian header, menggantikan title jika digunakan
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">footer</td>
              <td class="px-6 py-4 text-sm text-gray-500">Bagian footer</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
