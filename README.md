<h1>Simple Slots</h1>

<h2>About</h2>
<p>Simple Slots is a very simple solution of a Super 7 slot machine.</p>
<p>This repository is used in the <a href="https://github.com/tensoid/gambling-bot">Discord Gambling Bot</a> made by <a href="https://github.com/tensoid">tensoid</a> and <a href="https://github.com/dev-parzival">myself</a>.</p>

<h2>Arguments</h2>
<p>Simple Slots supports multiple url arguments, you can find a list with its corresponding description below:</p>
<p>This example forces the seven to have a spawn chance of 1000/1028:</p>
<code>https://dev-parzival.github.io/simple-slots/demo/index.html?seed=random&autospin=true&seven=1000</code>

<table>
<tr>
    <th>Argument Name</th>
    <th>Description</th>
    <th>Default</th>
    <th>Possible Values</th>
</tr>
<tr>
    <td>seed</td>
    <td>Seed used in the Mulberry32 random number generator.</td>
    <td>"random"</td>
    <td>MIN_SAFE_INT - MAX_SAFE_INT or "random"</td>
</tr>
<tr>
    <td>stresstest</td>
    <td>Automatically spinns the slots until every slot has the same value. This argument is for testing purposes to check how many spinns are needed to spinn a full house.</td>
    <td>FALSE</td>
    <td>TRUE or FALSE</td>
</tr>
<tr>
    <td>autospin</td>
    <td>The slower alternative to 'stresstest', except it won't stop spinning.</td>
    <td>FALSE</td>
    <td>TRUE or FALSE</td>
</tr>
<tr>
    <td>bar</td>
    <td>Modifies the chances of every slot to get the specified value.</td>
    <td>1</td>
    <td>0 - MAX_SAFE_INT</td>
</tr>
<tr>
    <td>bell</td>
    <td>Modifies the chances of every slot to get the specified value.</td>
    <td>3</td>
    <td>0 - MAX_SAFE_INT</td>
</tr>
<tr>
    <td>cherry</td>
    <td>Modifies the chances of every slot to get the specified value.</td>
    <td>5</td>
    <td>0 - MAX_SAFE_INT</td>
</tr>
<tr>
    <td>diamond</td>
    <td>Modifies the chances of every slot to get the specified value.</td>
    <td>3</td>
    <td>0 - MAX_SAFE_INT</td>
</tr>
<tr>
    <td>heart</td>
    <td>Modifies the chances of every slot to get the specified value.</td>
    <td>3</td>
    <td>0 - MAX_SAFE_INT</td>
</tr>
<tr>
    <td>hoof</td>
    <td>Modifies the chances of every slot to get the specified value.</td>
    <td>3</td>
    <td>0 - MAX_SAFE_INT</td>
</tr>
<tr>
    <td>lemon</td>
    <td>Modifies the chances of every slot to get the specified value.</td>
    <td>5</td>
    <td>0 - MAX_SAFE_INT</td>
</tr>
<tr>
    <td>melon</td>
    <td>Modifies the chances of every slot to get the specified value.</td>
    <td>5</td>
    <td>0 - MAX_SAFE_INT</td>
</tr>
<tr>
    <td>seven</td>
    <td>Modifies the chances of every slot to get the specified value.</td>
    <td>2</td>
    <td>0 - MAX_SAFE_INT</td>
</tr>
</table>

<h2>Demo</h2>

<h3 style="margin-left:50%;transform:translateX(-25%);"> >>> <a href="https://dev-parzival.github.io/simple-slots/demo/index.html">OPEN DEMO HERE</a> <<< </h3>

<img src="https://dev-parzival.github.io/simple-slots/docs/demo.gif">