# Cell Feature Test

## Test 1: Color syntax inside cells


<table>
  <tbody>
    <tr>
      <th>Header</th>
      <th>Result</th>
    </tr>
    <tr>
      <td><span style="color: green;">this should be green</span></td>
      <td>plain text</td>
    </tr>
    <tr>
      <td>mixed <span style="color: red;">red text</span> here</td>
      <td>normal</td>
    </tr>
  </tbody>
</table>


## Test 2: Image syntax inside cells


<table>
  <tbody>
    <tr>
      <th>Header</th>
      <th>Result</th>
    </tr>
    <tr>
      <td><img src="https://example.com/img.png" width="200" alt="alt"/></td>
      <td>plain text</td>
    </tr>
  </tbody>
</table>


## Test 3: Strikethrough inside cells


<table>
  <tbody>
    <tr>
      <th>Header</th>
      <th>Result</th>
    </tr>
    <tr>
      <td>~~strikethrough text~~</td>
      <td>plain text</td>
    </tr>
  </tbody>
</table>


## Test 4: Nested bold italic inside cells


<table>
  <tbody>
    <tr>
      <th>Header</th>
      <th>Result</th>
    </tr>
    <tr>
      <td><b>*bold and italic</b>*</td>
      <td>plain text</td>
    </tr>
    <tr>
      <td><b>bold with <i>italic</i> inside</b></td>
      <td>plain text</td>
    </tr>
  </tbody>
</table>


## Test 5: Lists inside cells


<table>
  <tbody>
    <tr>
      <th>Header</th>
      <th>Result</th>
    </tr>
    <tr>
      <td>1. first item<br/>2. second item<br/>3. third item</td>
      <td>plain text</td>
    </tr>
  </tbody>
</table>


## Test 6: Color syntax outside tables (should work)

<span style="color: green;">this is green</span>

<span style="color: red;">this is red</span>

## Test 7: Combined features inside cells


<table>
  <tbody>
    <tr>
      <th style="background-color: white; text-align: center;"> <b>Styled Header</b></th>
      <th style="background-color: grey;"><b>Another Header</b></th>
    </tr>
    <tr>
      <td><span style="color: green;">colored</span> and <b>bold</b> and <code>code</code></td>
      <td><img src="https://example.com/pic.png" width="100" alt="img"/></td>
    </tr>
    <tr>
      <td><span style="color: orange;"><a href="https://example.com">link text</a></span></td>
      <td>~~deleted~~ and <b>*bold italic</b>*</td>
    </tr>
  </tbody>
</table>


## Test 8: Code blocks inside cells with color nearby


<table>
  <tbody>
    <tr>
      <th>Code</th>
      <th>Description</th>
    </tr>
    <tr>
      <td><code class="language-json">{&quot;key&quot;: &quot;value&quot;}</code></td>
      <td><span style="color: green;">This describes the JSON</span></td>
    </tr>
  </tbody>
</table>
