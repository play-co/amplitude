<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:android="http://schemas.android.com/apk/res/android">

	<xsl:param name="ampKey" />
    <xsl:param name="ampKeyStaging" />
    <xsl:param name="develop" />

	<xsl:output indent="yes" />
	<xsl:template match="comment()" />

	<xsl:template match="meta-data[@android:name='AMPLITUDE_KEY']">
		<meta-data android:name="AMPLITUDE_KEY" android:value="{$ampKey}"/>
    </xsl:template>

	<xsl:template match="meta-data[@android:name='AMPLITUDE_KEY_STAGING']">
		<meta-data android:name="AMPLITUDE_KEY_STAGING" android:value="{$ampKeyStaging}"/>
    </xsl:template>

	<xsl:template match="meta-data[@android:name='WEEBY_DEBUG']">
		<meta-data android:name="WEEBY_DEBUG" android:value="{$develop}"/>
	</xsl:template>

	<xsl:template match="@*|node()">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()" />
		</xsl:copy>
	</xsl:template>
</xsl:stylesheet>
