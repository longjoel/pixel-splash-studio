using System;
using System.IO;
using System.Reflection;
using Gtk;

namespace PixelSplashStudio
{
    public static class UiBuilder
    {
        public static Builder Load(string resourceName)
        {
            Builder builder = new Builder();
            Assembly assembly = Assembly.GetExecutingAssembly();
            Stream stream = assembly.GetManifestResourceStream(resourceName);
            if (stream == null)
            {
                string qualifiedName = $"{assembly.GetName().Name}.{resourceName}";
                stream = assembly.GetManifestResourceStream(qualifiedName);
            }
            if (stream == null)
            {
                throw new InvalidOperationException($"Missing UI resource: {resourceName}");
            }

            using (stream)
            using (StreamReader reader = new StreamReader(stream))
            {
                builder.AddFromString(reader.ReadToEnd());
            }
            return builder;
        }
    }
}
