const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

async function run() {
  try {
    // Get input
    const apiUrl = core.getInput('api-url', { required: true });
    console.log(`Calling API: ${apiUrl}`);

    // Call the API
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    // Validate response structure
    if (!data.status || !data.service || !data.timestamp) {
      throw new Error('Invalid API response format. Expected status, service, and timestamp fields.');
    }

    // Generate Markdown
    const markdown = `## API Status

- Status: ${data.status}
- Service: ${data.service}
- Timestamp: ${data.timestamp}`;

    console.log('Generated Markdown:\n', markdown);

    // Update README.md
    const readmePath = path.join(process.env.GITHUB_WORKSPACE, 'README.md');
    
    if (!fs.existsSync(readmePath)) {
      throw new Error('README.md not found in repository root');
    }

    let readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Define markers
    const startMarker = '<!-- API_STATUS_START -->';
    const endMarker = '<!-- API_STATUS_END -->';
    
    // Check if markers exist
    if (!readmeContent.includes(startMarker) || !readmeContent.includes(endMarker)) {
      throw new Error('README.md must contain API_STATUS_START and API_STATUS_END markers');
    }

    // Replace content between markers
    const startIndex = readmeContent.indexOf(startMarker) + startMarker.length;
    const endIndex = readmeContent.indexOf(endMarker);
    
    const beforeMarker = readmeContent.substring(0, startIndex);
    const afterMarker = readmeContent.substring(endIndex);
    
    const updatedContent = `${beforeMarker}\n${markdown}\n${afterMarker}`;
    
    // Write updated content back to README
    fs.writeFileSync(readmePath, updatedContent, 'utf8');
    
    console.log('✓ README.md updated successfully');

    // Set outputs
    core.setOutput('status', data.status);
    core.setOutput('service', data.service);
    core.setOutput('timestamp', data.timestamp);

  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();